# Day 25 · HTTP API 请求
# 实现固定城市坐标的天气查询。检查响应字段并处理超时、网络失败和缺失字段；保留一个本地 JSON 样例用于离线测试。
# 先运行示例，再独立完成任务。

import json
from urllib.request import urlopen

url = "https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&current=temperature_2m"
with urlopen(url, timeout=10) as response:
    data = json.load(response)
print(data["current"]["temperature_2m"])

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
