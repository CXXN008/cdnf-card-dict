import pyautogui
import win32api,win32con
import time

c = 0
# start position
s_p = {'x': 339, 'y': 199}
# next page
np_p = {'x': 572, 'y': 520}

def mouse_left_click(new_x, new_y):
    mouse_move(new_x, new_y)
    time.sleep(.1)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
    time.sleep(.1)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)
    time.sleep(.1)


def cap_lines(j):
    global c
    for i in range(5):
        time.sleep(.3)
        mouse_move(s_p['x']+i*50, s_p['y']+j*60)
        time.sleep(.1)
        # orgin
        # pyautogui.screenshot(region=(598, 75, 206, 268)).save(
        #     f'game_image/{c}.png')
        # print(f'{c}.png saved(orgin)')
        # description
        pyautogui.screenshot(region=(598, 75, 206, 268)).save(
            f'game_image_des/{c}.png')
        print(f'{c}.png saved(des)')
        c += 1



def ss():
    # fisrt page
    mouse_move(s_p['x'], s_p['y'])
    for j in range(6):
        cap_lines(j)
    # next page
    for i in range(999):
        time.sleep(.3)
        mouse_left_click(np_p['x'],np_p['y'])
        time.sleep(.1)
        cap_lines(5)
        print(f'line: {i}')


def mouse_move(new_x, new_y):
    if new_y is not None and new_x is not None:
        point = (new_x, new_y)
        win32api.SetCursorPos(point)
        win32api.x = new_x
        win32api.y = new_y




def main():
    time.sleep(.5)
    ss()


if __name__ == '__main__':
    main()
