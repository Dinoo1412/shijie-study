# Day 19 · 类与对象
# 创建 Task 类，让任务可以标记完成。创建两个不同实例，验证完成一个不会改变另一个。
# 先运行示例，再独立完成任务。

class Task:
    def __init__(self, title):
        self.title = title
        self.done = False

    def complete(self):
        self.done = True

task = Task("完成练习")
task.complete()
print(task.done)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
