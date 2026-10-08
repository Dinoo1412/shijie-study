# Day 14 · 学生管理综合练习
# 开发命令行学生管理程序，支持新增、按姓名查询、更新成绩、删除和排名。用菜单循环处理命令。
# 先运行示例，再独立完成任务。

students = []

def add_student(name, score):
    students.append({"name": name, "score": score})

add_student("小林", 88)
print(students)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
