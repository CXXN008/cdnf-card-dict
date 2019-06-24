from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
import os
import matplotlib.pyplot as plt
import time
import collections

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
# print(classfiy_aHash(Image.open("398.png"),Image.open("492.png"),size=(206,268),exact=10000))
# print(time.time())


def load_image():
    for f in os.listdir("./game_image"):
        img.append(Image.open("./game_image/"+f))
    for f in os.listdir("./monster_card_ex"):
        img_ex.append(Image.open("./monster_card_ex/"+f))


load_image()
for i in img:
    res_i = {}
    for e in img_ex:
        res_i[e.filename] = classfiy_aHash(i, e, size=(206, 268))
    s_res = {k: v for k, v in sorted(res_i.items(), key=lambda x: x[1])}
    print(i.filename, list(s_res)[0])
 
