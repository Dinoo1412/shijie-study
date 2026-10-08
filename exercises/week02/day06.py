# Day 13 · 推导式与排序
# 对学生成绩排序，筛选及格学生并计算平均分。保持原始数据不被排序操作改变。
# 先运行示例，再独立完成任务。

students = [{"name": "林", "score": 82}, {"name": "陈", "score": 95}]
ranked = sorted(students, key=lambda s: s["score"], reverse=True)
passed = [s["name"] for s in students if s["score"] >= 60]
print(ranked, passed)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
