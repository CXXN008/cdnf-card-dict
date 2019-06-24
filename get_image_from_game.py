import win32gui


def reset_pos(x,y):
    hwnd = win32gui.FindWindow('地下城与勇士',None)
    rect = win32gui.GetWindowRect(hwnd)
    win32gui.SetWindowPos(hwnd,-2,x,y,rect[2]-rect[0],rect[3]-rect[1],64)

def main():
    reset_pos(0,0)
    

if __name__ == '__main__':
    main()