# Day 6 · 猜数字游戏
# 实现猜数字游戏，加入尝试次数计数和范围检查。最多猜 7 次；失败时显示答案。
# 先运行示例，再独立完成任务。

import random
secret = random.randint(1, 100)
while True:
    guess = int(input("猜一个 1–100 的数："))
    if guess == secret:
        print("猜对了！")
        break
    print("太小了" if guess < secret else "太大了")

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
