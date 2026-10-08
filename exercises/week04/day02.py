# Day 23 · 装饰器入门
# 写一个记录函数耗时的装饰器，使用 time.perf_counter。确认装饰后保留原函数返回值。
# 先运行示例，再独立完成任务。

from functools import wraps

def announce(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        print("开始执行")
        return fn(*args, **kwargs)
    return wrapper

@announce
def greet(name):
    return f"你好，{name}"

print(greet("小林"))

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
