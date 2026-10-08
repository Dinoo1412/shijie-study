# Day 5 · for、while 与循环
# 输出九九乘法表；再用 while 写从 1 累加到 100 的程序。尝试故意忘记更新计数器，理解死循环后按 Ctrl+C 停止。
# 先运行示例，再独立完成任务。

for row in range(1, 10):
    for col in range(1, row + 1):
        print(f"{col}×{row}={col * row}", end="  ")
    print()

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
