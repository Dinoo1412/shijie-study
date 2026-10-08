# Day 24 · 类型注解与代码组织
# 给待办管理器的主要函数加类型注解和说明，减少全局状态。编写空列表测试。
# 先运行示例，再独立完成任务。

from typing import List

def average(scores: List[float]) -> float:
    if not scores:
        raise ValueError("成绩不能为空")
    return sum(scores) / len(scores)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
