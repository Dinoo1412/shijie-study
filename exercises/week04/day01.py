# Day 22 · 迭代器与生成器
# 写一个逐行读取文本的生成器；统计非空行数量，解释它与一次性 read 的区别。
# 先运行示例，再独立完成任务。

def count_up(limit):
    for number in range(1, limit + 1):
        yield number

for number in count_up(3):
    print(number)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
