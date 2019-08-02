import requests
from requests_toolbelt import MultipartEncoder

filename = 'C:\\code\\cdnf-card-dict\\game_image_opt\\cn_card\\107.png'

m = MultipartEncoder(
    fields={
        'file': 'multipart',
        'Filedata': ('a.png', open(filename, 'rb'), 'image/png')
    }
)
res = requests.post(
    'https://api.uomg.com/api/image.ali', timeout=10, headers={'Content-Type': m.content_type}, data=m)
j = res.json()
print(j)