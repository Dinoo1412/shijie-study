# Day 17 · 异常处理
# 为计算器和猜数字游戏加入异常处理，让非数字输入不会终止程序。分别处理 ValueError 与除零。
# 先运行示例，再独立完成任务。

try:
    age = int(input("年龄："))
except ValueError:
    print("请输入一个整数")
else:
    print(f"年龄是 {age}")

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
