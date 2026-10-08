# Day 18 · 文件与 JSON
# 保存并读取待办列表，重启程序确认数据仍然存在。分别处理文件不存在和 JSON 格式损坏。
# 先运行示例，再独立完成任务。

import json

tasks = [{"title": "学 Python", "done": False}]
with open("tasks.json", "w", encoding="utf-8") as f:
    json.dump(tasks, f, ensure_ascii=False, indent=2)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
