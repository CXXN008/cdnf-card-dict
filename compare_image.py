from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
import os
import matplotlib.pyplot as plt
import time
import collections
import requests
import base64
from io import BytesIO
import json

img = []
img_ex = []


def getCode(img, size):
    pixel = []
    for x in range(0, size[0]):
        for y in range(0, size[1]):
            pixel_value = img.getpixel((x, y))
            pixel.append(pixel_value)

    avg = sum(pixel)/len(pixel)

    cp = []

    for px in pixel:
        if px > avg:
            cp.append(1)
        else:
            cp.append(0)
    return cp


def compCode(code1, code2):
    num = 0
    for index in range(0, len(code1)):
        if code1[index] != code2[index]:
            num += 1
    return num


def classfiy_aHash(image1, image2, size=(8, 8)):
    image1 = image1.resize(size).convert('L').filter(ImageFilter.BLUR)
    image1 = ImageOps.equalize(image1)
    code1 = getCode(image1, size)
    image2 = image2.resize(size).convert('L').filter(ImageFilter.BLUR)
    image2 = ImageOps.equalize(image2)
    code2 = getCode(image2, size)

    # plt.figure()
    # plt.subplot(1,2,1)
    # plt.imshow(image1)
    # plt.subplot(1,2,2)
    # plt.imshow(image2)
    # plt.show()

    res = compCode(code1, code2)
    assert len(code1) == len(code2), "error"

    return res

# print(time.time())
# print(classfiy_aHash(Image.open("398.png"),Image.open("492.png"),size=(206,268)))
# print(time.time())


def load_image():
    for f in os.listdir("./game_image"):
        img.append(Image.open("./game_image/"+f))
    for f in os.listdir("./monster_card_ex"):
        img_ex.append(Image.open("./monster_card_ex/"+f))


def image_to_base64(image_path):
    img = Image.open(image_path)
    output_buffer = BytesIO()
    img.save(output_buffer, format='JPEG')
    byte_data = output_buffer.getvalue()
    base64_str = base64.b64encode(byte_data)
    return base64_str


def save_json(data):
    with open('./image_info.json', 'w') as json_file:
        json_file.write(json.dumps(data))


def load_json():
    with open('./image_info.json') as json_file:
        try:
            data = json.load(json_file)
        except:
            data = {}
        return data


data = {
    'image': '',
    'language_type': 'CHN_ENG',
    'detect_direction': 'false',
    'detect_language': 'false',
    'probability': 'true'
}


load_image()
for i in img:
    res_i = {}
    for e in img_ex:
        res_i[e.filename] = classfiy_aHash(i, e, size=(206, 268))
    s_res = {k: v for k, v in sorted(res_i.items(), key=lambda x: x[1])}
    s_fn = i.filename.split('/')[2]
    data['image'] = image_to_base64(
        './game_image_des/'+s_fn)
    
    # bd online ocr 出game_image_des的文字存json
    # ['xxx.png':
    # {'ex_image':'monster_card_ex/xxx.png','des':{'properties':'xxx','name':'xxx',''}},]
    # 24.cccf696941228368cd60ce4819bb8b02.2592000.1564004478.282335-16627478
    # 低精 5W次 高精度 0.5k次 / 天 

    response = requests.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=24.cccf696941228368cd60ce4819bb8b02.2592000.1564004478.282335-16627478', data=data, verify=False)

    final_msg = load_json()
    final_msg[i.filename] = {
        'orignal_img': list(s_res)[0],
        'with_des_img': './game_image_des/'+s_fn,
        'ocr_result': response.json()
    }
    save_json(final_msg)
    print(final_msg)

