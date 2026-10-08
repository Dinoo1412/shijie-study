# Day 26 · async 与 await 入门
# 对比顺序等待两个任务与 gather 并发等待的耗时。解释为什么异步不会让纯计算自动变快。
# 先运行示例，再独立完成任务。

import asyncio

async def task(name):
    await asyncio.sleep(1)
    return name

async def main():
    print(await asyncio.gather(task("A"), task("B")))

asyncio.run(main())

# TODO: 在这里完成自己的练习，记录测试输入和实际结果。
