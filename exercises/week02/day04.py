# Day 11 · 字符串操作
# 清洗一段逗号分隔的关键词：去除空白、统一大小写、过滤空项、去重并排序。
# 先运行示例，再独立完成任务。

text = "  Python, AI, Python  "
words = [word.strip().lower() for word in text.split(",")]
print(" / ".join(words))

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
