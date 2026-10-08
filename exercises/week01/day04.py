# Day 4 · 条件判断
# 实现成绩等级判断：90–100 优秀、80–89 良好、60–79 及格，其余不及格。补充计算器的除零保护。
# 先运行示例，再独立完成任务。

score = float(input("分数："))
if score < 0 or score > 100:
    print("分数必须在 0 到 100 之间")
elif score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("继续加油")

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
