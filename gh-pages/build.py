import os
import json
version = json.load(open('package.json'))['version']
page_dir = '../../cdnf-card-page/'
cmds = [
    f'rm -rf {page_dir}*',
    f'git -C {page_dir} rm *',
    f'parcel build *.html --out-dir {page_dir} --no-cache --detailed-report --experimental-scope-hoisting --public-url ./ ',
    # '7z a final.zip final.json',
    'obsutil cp final.json obs://obs-e263/final.json',
    f'cp favicon.ico {page_dir}',
    f'git -C {page_dir} add *',
    f'git -C {page_dir} commit -m "{version} auto commited"',
    f'git -C {page_dir} push'
]

for c in cmds:
    print(f'\nrunning :{c}\n-----------\n')
    os.system(c)
