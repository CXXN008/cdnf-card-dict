import requests
import json
import re
from PIL import Image
from requests_toolbelt import MultipartEncoder


grades = {
    34: 'white',
    23: 'blue',
    111: 'purples',
    170: 'pink',
    235: 'orange'
}
result = []

with open('./image_info.json') as f:
    data = json.load(f)


for i in data:
    item = {}
    s = data[i]['orignal_img'].split('/')
    s_game = i.split('/')
    item['file'] = s[len(s)-1].replace('.png', '')
    item['game_shot'] = s_game[len(s)-1].replace('.png', '')
    p_temp = 0
    item['p_type'] = ''
    item['extra'] = ''
    for o in range(len(data[i]['ocr_result']['words_result'])):
        # ocr准度不行，个别需要人工修正
        if('升级' in data[i]['ocr_result']['words_result'][o]['words']):
            f_name = ''
            if o == 0:
                f_name = 'unknow'
            else:
                p_temp = o + 2
                for n in range(o):
                    f_name += data[i]['ocr_result']['words_result'][n]['words']
                r_name = f_name.replace('⊙', '').replace(
                    '◎', '').strip().split('卡片')[0]
                item['name'] = r_name
                item['upgradable'] = data[i]['ocr_result']['words_result'][o]['words']
                item['position'] = data[i]['ocr_result']['words_result'][o+1]['words']
        if('决斗场' in data[i]['ocr_result']['words_result'][o]['words']):
            for j in range(p_temp, o):
                item['p_type'] += data[i]['ocr_result']['words_result'][j]['words'].split('+')[
                    0] + ','
            item['p_type'] = item['p_type'].strip(',')
            try:
                item['min_p'] = re.findall(
                    r"\d+\.?\d*", data[i]['ocr_result']['words_result'][o-1]['words'].split('+')[1])[0]
                item['max_p'] = re.findall(
                    r"\d+\.?\d*", data[i]['ocr_result']['words_result'][o-1]['words'].split('上限')[-1])[0]
            except:
                pass
            item['e_pkc'] = data[i]['ocr_result']['words_result'][o]['words'].strip(
                '[').strip(']')
            try:
                offset = 1
                while '合成' not in data[i]['ocr_result']['words_result'][o+offset]['words']:
                    item['extra'] += data[i]['ocr_result']['words_result'][o+offset]['words']
                    offset += 1
            except:
                pass
            item['extra'] = item['extra'].strip('附魔师的副职业材料').strip('。')
        if('合成器' in data[i]['ocr_result']['words_result'][o]['words']):
            item['hechengqi'] = data[i]['ocr_result']['words_result'][o]['words']
        if('合成获' in data[i]['ocr_result']['words_result'][o]['words']):
            item['hecheng'] = data[i]['ocr_result']['words_result'][o]['words']

    im = Image.open(data[i]['orignal_img'])
    rgb_im = im.convert('RGB')
    r, g, b = rgb_im.getpixel((16, 25))
    try:
        item['grade'] = grades[r]
    except:
        if(r > 200):
            item['grade'] = 'orange'
        else:
            item['grade'] = "I don't know!!!"
    m = MultipartEncoder(
        fields={
            'file': 'multipart',
                    'Filedata': ('a.png', open('./game_image_opt/'+str(item['file'])+'.png', 'rb'), 'image/png')
        }
    )
    while(1):
        try:
            res = requests.post(
                'https://api.uomg.com/api/image.ali', timeout=10, headers={'Content-Type': m.content_type}, data=m)
            j = res.json()
            print(j, './game_image_opt/'+str(item['file'])+'.png')
            if(j['code'] == 1):
                item['url'] = j['imgurl']
            result.append(item)
            break
        except Exception as e:
            print(e)


print('███████████████done███████████████')
with open('./final.json', 'w') as json_file:
    json_file.write(json.dumps(result))
