# Day 10 · 字典与用户信息
# 使用字典管理用户资料，实现新增字段、修改年龄、读取不存在的字段以及删除字段。
# 先运行示例，再独立完成任务。

user = {"name": "小林", "age": 23}
user["city"] = "上海"
print(user.get("email", "未填写"))
for key, value in user.items():
    print(key, value)

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
