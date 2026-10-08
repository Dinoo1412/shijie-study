/* 课程内容是围绕零基础学习路线编写的学习材料，不是招聘承诺。 */
const RESOURCES = [
  {id:'python',name:'Python 官方中文教程',category:'Python 基础',url:'https://docs.python.org/zh-cn/3/tutorial/',desc:'配合前四周课程，查阅语法、数据结构、异常、模块和类。先做练习，再用文档查漏补缺。'},
  {id:'install',name:'Python 下载与安装',category:'环境搭建',url:'https://www.python.org/downloads/',desc:'从官方渠道获取 Python 3。已有可用的 Python 3 环境时可直接开始练习。'},
  {id:'vscode',name:'Visual Studio Code',category:'开发工具',url:'https://code.visualstudio.com/',desc:'打开 exercises 文件夹，编写代码，再在终端运行。'},
  {id:'network',name:'MDN · HTTP 概述',category:'计算机基础',url:'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview',desc:'理解请求、响应、方法、状态码与 HTTP 通信。'},
  {id:'git',name:'Pro Git 中文书',category:'工程基础',url:'https://git-scm.com/book/zh/v2',desc:'从仓库、提交和分支开始，理解如何记录与协作修改代码。'},
  {id:'async',name:'Python · asyncio',category:'Python 进阶',url:'https://docs.python.org/zh-cn/3/library/asyncio.html',desc:'查阅协程、任务、超时与并发控制。用计时实验验证理解。'},
  {id:'fastapi',name:'FastAPI 中文教程',category:'后端开发',url:'https://fastapi.tiangolo.com/zh/tutorial/',desc:'从第一个接口开始，逐步学习参数校验、依赖注入和测试。'},
  {id:'postgres',name:'PostgreSQL 官方文档',category:'数据库',url:'https://www.postgresql.org/docs/',desc:'学习 SQL、数据约束、索引和事务。'},
  {id:'redis',name:'Redis 官方文档',category:'缓存',url:'https://redis.io/docs/latest/',desc:'学习数据类型、缓存过期与缓存一致性。'},
  {id:'docker',name:'Docker 入门',category:'部署',url:'https://docs.docker.com/get-started/',desc:'用镜像与容器部署你自己的服务，验证数据持久化。'},
  {id:'pytest',name:'pytest 官方文档',category:'测试',url:'https://docs.pytest.org/en/stable/',desc:'为正常输入、边界情况、权限与错误路径编写测试。'},
  {id:'llm',name:'Hugging Face · LLM Course',category:'大模型',url:'https://huggingface.co/learn/llm-course/chapter1/1',desc:'认识 Transformer、分词与语言模型，后续再深入模型原理。'},
  {id:'qdrant',name:'Qdrant 官方文档',category:'RAG',url:'https://qdrant.tech/documentation/',desc:'学习向量存储、检索、过滤与索引。'},
  {id:'langgraph',name:'LangGraph 官方文档',category:'Agent',url:'https://docs.langchain.com/oss/python/langgraph/overview',desc:'学习状态图、持久化、中断与恢复。先用普通代码写一个 Agent Loop。'},
  {id:'mcp',name:'MCP 官方文档',category:'协议',url:'https://modelcontextprotocol.io/docs/getting-started/intro',desc:'理解 Host、Client、Server 及工具、资源和提示。'},
  {id:'go',name:'Go 官方学习入口',category:'Go',url:'https://go.dev/learn/',desc:'学习语法、接口、并发与 HTTP 服务。'},
  {id:'otel',name:'OpenTelemetry 官方文档',category:'可观测性',url:'https://opentelemetry.io/docs/',desc:'学习日志、指标与追踪，定位系统瓶颈。'}
];
const STAGES = [
  {id:1,range:[1,4],months:'第 1 个月',title:'先写出自己的 Python 程序',desc:'认识编程，从输入输出到独立完成小型项目。',tags:['基础语法','数据结构','工程入门'],gate:'独立完成约 200 行的小项目，能解释每个核心函数，并处理异常输入。'},
  {id:2,range:[5,8],months:'第 2 个月',title:'理解程序如何运行与通信',desc:'网络、Git、算法和异步，搭起工程基础。',tags:['HTTP','Git / Linux','asyncio'],gate:'讲清一次 HTTP 请求过程；使用 Git 管理项目；完成异步请求与性能对比。'},
  {id:3,range:[9,16],months:'第 3–4 个月',title:'构建可部署的后端服务',desc:'让数据、接口、权限和部署组成完整系统。',tags:['FastAPI','PostgreSQL / Redis','Docker'],gate:'任务系统支持登录、权限隔离、分页、测试与部署；重启后数据仍存在。'},
  {id:4,range:[17,20],months:'第 5 个月',title:'把大模型接入真实应用',desc:'理解 Token、上下文、结构化输出和流式响应。',tags:['LLM API','Prompt','SSE'],gate:'聊天助手支持多轮对话、历史记录、流式响应、失败处理与用量统计。'},
  {id:5,range:[21,28],months:'第 6–7 个月',title:'让回答有知识与依据',desc:'从文档解析到检索评测，完成可解释的 RAG。',tags:['Embedding','混合检索','Reranker'],gate:'知识库支持上传、索引与来源引用；建立 50–100 条人工校验问题并完成对比评测。'},
  {id:6,range:[29,40],months:'第 8–9 个月',title:'让 Agent 可靠地完成任务',desc:'先理解执行循环，再学习编排、记忆和协作。',tags:['LangGraph','MCP','Multi-Agent'],gate:'办公平台支持工具调用、审批、中断恢复与轨迹；解释每个 Agent 的必要性。'},
  {id:7,range:[41,52],months:'第 10–12 个月',title:'从会开发到能讲清设计',desc:'补足 Go 与系统设计，用真实工程证据准备面试。',tags:['Go / 并发','系统设计','项目表达'],gate:'提供部署文档、测试和真实压测结果；能讲清技术选择、瓶颈与优化依据。'}
];
// 每周的概念与交付物来自路线；后三个自然月统一按每月四周安排。
const WEEK_SPECS = [
 ['Python 起步','运行计算器和猜数字游戏',['环境与终端','变量与类型','输入输出','条件判断','循环'],'python'],
 ['常用数据结构','完成学生信息管理程序',['列表','元组与集合','字典','字符串','函数与排序'],'python'],
 ['Python 工程基础','完成 JSON 待办管理器',['模块','虚拟环境','异常','文件与 JSON','类与对象'],'python'],
 ['进阶入门','完成可处理失败的天气查询程序',['生成器','装饰器','类型注解','API 请求','async / await'],'python'],
 ['计算机网络','用 Python 请求 API 并解释请求过程',['IP 与端口','DNS','TCP / UDP','HTTP 方法与状态码','HTTPS'],'network'],
 ['Linux 与 Git','建立有分支和提交记录的学习仓库',['目录与权限','进程与端口','环境变量','提交与分支','合并与冲突'],'git'],
 ['数据结构与算法','实现队列、二分查找并记录复杂度',['复杂度','栈与队列','哈希表','二分查找','排序'],'python'],
 ['异步编程','比较十个请求的串行与并发耗时',['阻塞与非阻塞','线程与进程','事件循环','gather 与超时','Semaphore'],'async'],
 ['FastAPI 起步','实现任务 CRUD 接口',['REST API','路由','路径参数','请求体','响应状态码'],'fastapi'],
 ['API 校验与错误处理','实现用户管理接口',['Pydantic','字段约束','路由拆分','异常响应','依赖注入'],'fastapi'],
 ['SQL 与数据库设计','设计用户、任务和订单表',['SELECT','表与主键','外键与约束','JOIN','索引与 EXPLAIN'],'postgres'],
 ['SQLAlchemy 与事务','实现任务数据库持久化',['ORM 映射','会话','迁移','事务回滚','连接池'],'postgres'],
 ['登录与权限','实现用户注册、登录和资源隔离',['密码哈希','JWT','认证依赖','所有权校验','鉴权测试'],'fastapi'],
 ['Redis 与缓存','加入缓存并验证过期与一致性',['数据类型','TTL','Cache Aside','缓存失效','缓存穿透'],'redis'],
 ['Docker 与部署','从空环境部署任务管理服务',['Dockerfile','Compose','持久化卷','Nginx','健康检查'],'docker'],
 ['测试与日志','交付任务系统测试和排障文档',['pytest','测试隔离','异常路径','结构化日志','响应耗时'],'pytest'],
 ['大模型概念','解释 Token、上下文与模型限制',['LLM','Transformer 概览','Token','上下文窗口','Embedding'],'llm'],
 ['模型 API 与流式输出','实现最小流式聊天接口',['请求参数','Prompt','多轮上下文','SSE','调用超时'],'llm'],
 ['结构化输出与工具调用','完成带校验的计算器工具调用',['JSON Schema','结构化输出','工具参数','执行与返回','失败重试'],'llm'],
 ['AI 聊天助手','交付多轮流式聊天服务',['会话存储','历史分页','断开处理','Token 记录','错误测试'],'fastapi'],
 ['文档解析','生成可追踪来源的文档文本',['PDF','Word','编码','清洗','元数据'],'python'],
 ['文本切分','对比固定切块与结构切块',['Chunk 大小','Overlap','段落切分','标题结构','来源定位'],'qdrant'],
 ['Embedding 与相似度','比较查询与文档的向量相似度',['向量','余弦相似度','Embedding API','批量处理','成本记录'],'qdrant'],
 ['向量数据库','实现向量写入与过滤检索',['Collection','Upsert','Top K','Metadata 过滤','索引'],'qdrant'],
 ['RAG 问答链路','实现带引用的知识库问答',['检索','上下文组装','引用','拒答','检索日志'],'qdrant'],
 ['混合检索','对比 BM25、向量与混合检索',['倒排索引','BM25','语义检索','RRF','召回对比'],'qdrant'],
 ['重排与查询改写','对比优化前后检索质量',['Reranker','Query Rewrite','查询扩展','延迟','错误分析'],'qdrant'],
 ['RAG 评测','交付 50–100 条问题的检索报告',['标注集','Recall@K','MRR','引用准确率','对比实验'],'qdrant'],
 ['Agent 原理','用普通 Python 编写 Agent Loop',['ReAct','规划','工具请求','观察','终止条件'],'langgraph'],
 ['工具与可靠执行','为计算器和 API 工具编写校验',['工具定义','参数校验','白名单','超时','幂等性'],'langgraph'],
 ['LangChain 基础','实现工具调用 Agent',['消息类型','模型适配','工具注册','Agent','执行轨迹'],'langgraph'],
 ['LangGraph 状态图','实现可观察的有状态工作流',['State','Node','Edge','Reducer','条件分支'],'langgraph'],
 ['Checkpoint 与恢复','实现审批、中断和进程重启恢复',['循环限制','Checkpoint','Thread ID','Interrupt','Resume'],'langgraph'],
 ['Agent 记忆','实现用户隔离的短期与长期记忆',['对话状态','摘要','写入策略','语义检索','更新与删除'],'langgraph'],
 ['MCP Server','开发可被发现和调用的工具服务',['Host / Client / Server','JSON-RPC','Tools','Resources','stdio'],'mcp'],
 ['MCP Client','连接自己的 MCP 服务并处理失败',['初始化','工具发现','工具调用','Streamable HTTP','认证与超时'],'mcp'],
 ['多 Agent 架构','为任务设计最小必要协作流程',['Supervisor','角色职责','Handoff','共享状态','调用成本'],'langgraph'],
 ['多 Agent 协作','实现检索、分析与校验协作',['委派','结果汇总','校验','冲突','失败恢复'],'langgraph'],
 ['Agent 评测','记录任务成功率与完整执行轨迹',['测试任务','成功标准','Tracing','工具准确率','成本与延迟'],'otel'],
 ['办公平台整合','交付可演示的多智能体办公平台',['任务入口','审批界面','恢复','部署','README'],'langgraph'],
 ['Go 语法','用 Go 编写命令行任务程序',['变量与切片','Map','结构体','接口','错误处理'],'go'],
 ['Go HTTP 服务','实现有校验的任务 API',['net/http','JSON','路由','Context','优雅退出'],'go'],
 ['Go 并发','实现有限并发任务处理器',['Goroutine','Channel','Mutex','WaitGroup','数据竞争'],'go'],
 ['Go 实践整合','交付可取消的任务处理服务',['Context 取消','Worker Pool','背压','超时','测试'],'go'],
 ['任务队列与系统设计','设计长任务异步处理流程',['任务状态','队列','重试','幂等','资源隔离'],'redis'],
 ['限流与高可用','验证并发上限和失败保护',['限流','连接池','熔断','缓存','横向扩容'],'otel'],
 ['监控与压测','输出有环境说明的真实压测报告',['指标','Tracing','P95 / P99','负载模型','瓶颈定位'],'otel'],
 ['部署与恢复','完成备份恢复演练和故障手册',['配置','健康检查','数据备份','恢复演练','回滚'],'docker'],
 ['综合项目优化','用数据证明一次工程优化',['基线','性能剖析','优化假设','对比测试','成本分析'],'otel'],
 ['算法与后端复习','整理常见算法和后端问题',['数组与哈希','栈与队列','树遍历','网络','数据库'],'python'],
 ['项目表达与模拟面试','完成项目介绍和两次模拟面试',['架构图','技术选择','故障案例','指标证据','问答复盘'],'langgraph'],
 ['作品集与投递准备','整理可复现项目和求职材料',['README','演示脚本','能力自测','简历','查漏补缺'],'git']
];
const FIRST_MONTH = [
 ['环境搭建与第一个程序','程序是一组让计算机按顺序执行的指令。编辑器负责写代码，终端负责启动程序，Python 解释器负责执行它。文件名的 .py 表示这是 Python 源文件。', 'print("你好，Python！")\nname = input("你叫什么名字？")\nprint(f"你好，{name}！")', '打开 exercises/week01/day01.py。先在终端运行 python --version，再运行 python exercises/week01/day01.py。修改问候语，询问年龄并输出十年后的年龄。', ['能在终端看到 Python 版本','能运行并修改 .py 文件','能解释 print、input 与 f-string'], '若提示 python 无法识别，安装官方 Python 3 并勾选加入 PATH，再重新打开终端；Windows 也可试 py。若找不到文件，用 cd 切换到 Study 文件夹。不要把 >>> 复制进文件。', 'input 返回的年龄能直接加 10 吗？', '不能。input 返回字符串，要先用 int 转成整数；对不能转换的输入可在学完异常处理后捕获 ValueError。','install'],
 ['变量、数字与字符串','变量把名称和一个值关联起来。整数适合计数，浮点数适合带小数的数值，字符串表示文本。名称尽量描述意义。', 'name = "小林"\nage = 23\nheight = 1.72\nprint(type(age))\nprint(f"{name}，{age} 岁，身高 {height} 米")', '创建个人信息程序，保存姓名、年龄、城市、学习目标；使用 f-string 输出一段介绍，修改变量后再次运行。', ['使用至少四个有含义的变量','能区分数字 23 与字符串 "23"','能用 type 检查类型'], '字符串两边要使用成对的英文引号。= 是赋值，不是比较；变量名不能以数字开头。','为什么 "2" + "3" 得到 "23"？','两个操作数都是字符串，+ 表示拼接；整数 2 + 3 才是数值加法。','python'],
 ['类型转换与四则运算','用户输入先是文本。int 和 float 用于转换数字。/ 做除法，// 做整除，% 得到余数；bool 表示真或假。', 'a = float(input("第一个数："))\nb = float(input("第二个数："))\nprint("和：", a + b)\nprint("差：", a - b)\nprint("积：", a * b)', '写一个四则运算计算器。先处理正常输入；列出空输入、非数字、除以零三种失败情况，下一天增加除零分支。', ['正确计算整数与小数','能说明 int 和 float 的区别','记录至少三种异常输入'], 'float("abc") 会失败。不要用 eval 处理用户输入。除以零会抛出异常；今天先记录这个问题。','int("3.5") 可以转换成功吗？','不能，这个字符串不是整数表示。float("3.5") 可以得到 3.5；int(3.5) 则截去小数部分得到 3。','python'],
 ['条件判断','条件决定代码走哪条路径。if 判断第一个条件，elif 判断后续条件，else 处理其余情况。缩进表示属于同一个分支。', 'score = float(input("分数："))\nif score < 0 or score > 100:\n    print("分数必须在 0 到 100 之间")\nelif score >= 90:\n    print("优秀")\nelif score >= 60:\n    print("及格")\nelse:\n    print("继续加油")', '实现成绩等级判断：90–100 优秀、80–89 良好、60–79 及格，其余不及格。补充计算器的除零保护。', ['正确判断 59、60、79、80、89、90','拒绝小于 0 或大于 100 的分数','分支缩进一致'], '条件末尾需要冒号。使用四个空格缩进。先检查非法值，再从高分到低分判断，否则高分也会进入较低分支。','为什么比较要写 ==？','= 把值赋给变量；== 比较两个值是否相等，返回布尔值。','python'],
 ['for、while 与循环','循环重复执行代码。for 遍历序列，while 在条件为真时继续。range 的结束值不包含在生成结果中。', 'for row in range(1, 10):\n    for col in range(1, row + 1):\n        print(f"{col}×{row}={col * row}", end="  ")\n    print()', '输出九九乘法表；再用 while 写从 1 累加到 100 的程序。尝试故意忘记更新计数器，理解死循环后按 Ctrl+C 停止。', ['乘法表输出九行','1 到 100 的和为 5050','能解释 range(1, 10) 的范围'], 'while 的循环变量必须推进。内层循环要放在外层循环内部；print() 用于换行。','什么时候更适合用 while？','当重复次数不确定、要根据条件停止时，例如不断读取输入直到用户输入退出。','python'],
 ['猜数字游戏','把输入、条件和循环组合起来，就能完成一个有交互的小程序。random.randint 可以生成包含两端的随机整数。', 'import random\nsecret = random.randint(1, 100)\nwhile True:\n    guess = int(input("猜一个 1–100 的数："))\n    if guess == secret:\n        print("猜对了！")\n        break\n    print("太小了" if guess < secret else "太大了")', '实现猜数字游戏，加入尝试次数计数和范围检查。最多猜 7 次；失败时显示答案。', ['能提示太大或太小','猜中后结束循环','限制最多七次有效尝试'], '每次循环重新生成答案会使游戏无法稳定获胜。把随机答案放在循环之前；先验证输入范围。','break 和 continue 有何不同？','break 退出最近的一层循环；continue 跳过本轮剩余代码，进入下一轮。','python'],
 ['第一周复习与验收','能独立写出来才算掌握。先关闭前六天的参考答案，画出流程，再按自己的思路完成程序。', '# 先写流程，再实现\n# 1. 获取输入\n# 2. 校验和转换\n# 3. 根据条件计算\n# 4. 输出结果', '不看示例重写计算器和猜数字游戏。给每个程序设计五组输入，把预期输出与实际输出记在笔记中。', ['独立完成两个程序','至少测试五组输入','用自己的话解释每个分支与循环'], '如果卡住，先缩小任务，例如只实现加法。查询单个语法点可以，但不要复制整个答案。','如何证明自己掌握了一个程序？','能从空文件写出它，修改需求后仍能实现，并说明边界情况与测试方法。','python'],
 ['列表与成绩管理','列表保存一组有顺序的值，索引从 0 开始。append 添加数据，len 返回数量，sum 可累加数字。', 'scores = [82, 90, 76]\nscores.append(88)\nprint(scores[0])\nprint(sum(scores) / len(scores))', '管理学生成绩：添加一项成绩，输出最高分、最低分和平均分。处理空列表。', ['正确计算三项统计值','能添加和遍历成绩','空列表不会除以零'], '访问不存在的索引会触发 IndexError。求平均分前先确认列表非空。','scores[-1] 表示什么？','列表的最后一个元素；负数索引从末尾向前计数。','python'],
 ['元组与集合','元组适合表示固定结构的数据；集合保存不重复的值，适合去重与成员判断，不能依赖集合的顺序。', 'point = (3, 5)\ntags = ["Python", "AI", "Python"]\nunique = set(tags)\nprint(sorted(unique))', '给名单去重并排序。再使用元组表示姓名和年龄，比较列表、元组、集合的用途。', ['去重后没有重复项','能解释元组的不可变性','不依赖集合输出顺序'], '{} 创建空字典，空集合用 set()。集合元素必须可哈希，不能直接放列表。','去重还要保留原顺序怎么办？','可以遍历原列表，用集合判断是否已出现，并把新元素追加到结果列表。','python'],
 ['字典与用户信息','字典用键找到对应的值，适合表示用户或任务。get 可提供默认值；遍历 items 得到键和值。', 'user = {"name": "小林", "age": 23}\nuser["city"] = "上海"\nprint(user.get("email", "未填写"))\nfor key, value in user.items():\n    print(key, value)', '使用字典管理用户资料，实现新增字段、修改年龄、读取不存在的字段以及删除字段。', ['能增删改查键值','能使用 get 处理缺失字段','解释字典与列表的区别'], '直接访问不存在的键会触发 KeyError。不要把一个字段的值误当成索引。','为什么 API 数据经常使用字典？','它可以用明确的字段名组织结构化信息，且容易映射到 JSON 对象。','python'],
 ['字符串操作','字符串不可变。strip 去除首尾空白，split 拆分，join 拼接，lower 统一大小写。文本清洗往往是后续处理的第一步。', 'text = "  Python, AI, Python  "\nwords = [word.strip().lower() for word in text.split(",")]\nprint(" / ".join(words))', '清洗一段逗号分隔的关键词：去除空白、统一大小写、过滤空项、去重并排序。', ['处理连续逗号与空格','输出不含空关键词','结果大小写统一'], 'strip 只处理首尾，不会删除字符串中间的空格。split 后需要逐个清洗。','字符串能用 text[0] = "A" 修改吗？','不能。字符串不可变，需要创建新字符串并赋值。','python'],
 ['函数与参数','函数把一项有名称的操作封装起来。参数是输入，return 是输出；print 只是显示，不等同于返回。', 'def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)', '把计算器的四种运算写成函数。除数为零时返回明确的错误提示；写五组测试调用。', ['函数可多次调用','区分 return 和 print','不使用不必要的全局变量'], '函数未写 return 时默认返回 None。定义函数后还需要调用才会执行。','局部变量在函数外能直接用吗？','通常不能。应通过参数传入、通过返回值取出，保持依赖明确。','python'],
 ['推导式与排序','推导式从现有数据生成新的列表。sorted 返回新列表，sort 在原列表上排序。key 指定用于比较的字段。', 'students = [{"name": "林", "score": 82}, {"name": "陈", "score": 95}]\nranked = sorted(students, key=lambda s: s["score"], reverse=True)\npassed = [s["name"] for s in students if s["score"] >= 60]\nprint(ranked, passed)', '对学生成绩排序，筛选及格学生并计算平均分。保持原始数据不被排序操作改变。', ['成绩按降序排列','筛选结果正确','能解释排序 key 的作用'], 'list.sort() 返回 None。不要写 ranked = students.sort()。先用普通循环写明白，再改成推导式。','reverse=True 改变什么？','让比较结果按降序排列，不会改变用来比较的字段。','python'],
 ['学生管理综合练习','把列表、字典和函数组合起来。先设计数据结构，再设计添加、查询、修改和删除操作。', 'students = []\n\ndef add_student(name, score):\n    students.append({"name": name, "score": score})\n\nadd_student("小林", 88)\nprint(students)', '开发命令行学生管理程序，支持新增、按姓名查询、更新成绩、删除和排名。用菜单循环处理命令。', ['五种操作都可运行','拒绝重复姓名与非法分数','查询不存在的学生时明确提示'], '先用内存存储，不急着写文件。删除列表项时避免在遍历同一个列表时随意修改它。','为什么把每个操作拆成函数？','明确职责，使操作能独立调用和测试，避免菜单代码混入所有逻辑。','python'],
 ['模块与导入','模块是可被导入的 Python 文件。把可复用逻辑放在模块里，把启动代码放在 main 入口中。', 'import math\n\nif __name__ == "__main__":\n    print(math.sqrt(81))', '把计算器函数放入 calculator.py，在 main.py 中导入并调用。给启动代码添加入口保护。', ['能从另一个文件导入函数','导入时不会启动交互菜单','模块名称不与标准库重复'], '不要把文件命名为 random.py 或 json.py，以免遮蔽标准库。两个文件先放在同一目录。','入口保护有什么作用？','直接运行文件时执行入口；作为模块导入时避免自动执行交互或其他副作用。','python'],
 ['虚拟环境与依赖','虚拟环境为每个项目隔离依赖。python -m pip 确保依赖装进对应解释器；记录依赖方便复现。', '# 在终端运行，不是 Python 代码\npython -m venv .venv\n.venv\\Scripts\\python -m pip --version\n.venv\\Scripts\\python -m pip list', '创建 .venv，并用其中的 Python 查看 pip。理解解释器路径与依赖的关系，给项目写环境说明。', ['能够创建独立环境','能确认当前解释器路径','知道 .venv 不应提交到仓库'], 'PowerShell 激活脚本受限制时，可以直接运行 .venv\\Scripts\\python.exe，无需修改系统策略。','为什么不把所有依赖装进全局环境？','不同项目可能需要不同版本。隔离环境减少冲突，使项目更容易复现。','python'],
 ['异常处理','异常表示运行中发生的失败。try 放可能失败的操作，except 捕获特定错误；应给用户明确反馈。', 'try:\n    age = int(input("年龄："))\nexcept ValueError:\n    print("请输入一个整数")\nelse:\n    print(f"年龄是 {age}")', '为计算器和猜数字游戏加入异常处理，让非数字输入不会终止程序。分别处理 ValueError 与除零。', ['异常输入不会让程序崩溃','捕获具体异常类型','正常输入仍然正确运行'], '不要用裸 except 隐藏所有错误。只在能够处理错误的地方捕获；调试时阅读 traceback 最后几行。','异常为什么不总是应该忽略？','有些异常意味着代码缺陷或数据损坏。忽略会掩盖问题；应按情况报告、重试或终止。','python'],
 ['文件与 JSON','JSON 适合保存列表、字典等结构化数据。with 确保文件用完后关闭；明确 UTF-8 编码可避免中文乱码。', 'import json\n\ntasks = [{"title": "学 Python", "done": False}]\nwith open("tasks.json", "w", encoding="utf-8") as f:\n    json.dump(tasks, f, ensure_ascii=False, indent=2)', '保存并读取待办列表，重启程序确认数据仍然存在。分别处理文件不存在和 JSON 格式损坏。', ['中文保存正确','重启后读取已有任务','坏文件不会被无提示覆盖'], 'w 模式会覆盖原文件。先读入原数据，再修改和保存。文件不存在与文件损坏应区别处理。','JSON 能保存任意 Python 对象吗？','不能。常用的是字符串、数字、布尔、null、数组和对象；自定义类要先转成可序列化结构。','python'],
 ['类与对象','类描述一类事物的数据和操作，对象是具体实例。self 指向当前实例，__init__ 初始化数据。', 'class Task:\n    def __init__(self, title):\n        self.title = title\n        self.done = False\n\n    def complete(self):\n        self.done = True\n\ntask = Task("完成练习")\ntask.complete()\nprint(task.done)', '创建 Task 类，让任务可以标记完成。创建两个不同实例，验证完成一个不会改变另一个。', ['每个实例独立保存状态','能解释 self','类的方法能够修改自身状态'], '避免把所有任务共用的可变列表放成类属性。实例数据应在 __init__ 中初始化。','类一定比字典更好吗？','不一定。简单记录用字典很合适；行为和约束较多时类有助于封装。','python'],
 ['命令行待办管理器','项目的可靠性取决于完整的操作与失败路径。为每个任务分配稳定 ID，避免删除后列表位置变化导致误操作。', '# 项目建议结构\n# main.py      菜单入口\n# storage.py   JSON 读写\n# tasks.py     添加、查询、完成、删除\n# tasks.json   持久化数据', '整合前几天的知识，实现添加、查询、完成、删除任务并保存 JSON。添加退出命令和清楚的提示。', ['四种核心操作可运行','使用稳定 ID 找到任务','重启后保留内容与完成状态'], '任务 ID 不要直接使用列表下标。保存前检查数据结构，损坏文件先保留并报告。','数据持久化与存在变量里有什么区别？','变量通常只在进程运行期间存在；持久化将数据保存到文件或数据库，重启后可读取。','python'],
 ['第三周项目验收','像用户一样运行你的程序。测试正常情况、空数据、非法输入以及持久化失败，并把操作方法写入 README。', '# 验收场景\n# 空列表查询 → 明确提示\n# 添加两项 → 产生不同 ID\n# 完成一项 → 只改变目标任务\n# 退出重启 → 数据保持', '为待办管理器写 README，说明运行方法、功能和限制。记录至少八个测试场景，修复发现的问题。', ['README 可指导别人运行','至少八个场景有实际结果','能解释文件读写与异常处理'], '仅测试快乐路径不够。特别检查错误 ID、空标题、中文、重复完成和文件损坏。','项目验收应该检查什么？','需求是否实现、边界是否处理、数据是否正确、运行步骤是否可复现。','pytest'],
 ['迭代器与生成器','迭代器逐个提供数据。生成器用 yield 暂停并保留状态，下次继续，可避免一次构建大型列表。', 'def count_up(limit):\n    for number in range(1, limit + 1):\n        yield number\n\nfor number in count_up(3):\n    print(number)', '写一个逐行读取文本的生成器；统计非空行数量，解释它与一次性 read 的区别。', ['使用 yield 返回多个值','能按顺序消费生成器','知道生成器耗尽后不能直接重用'], '不要把 yield 当作立即终止函数的 return。想重新遍历，需要重新创建生成器。','生成器总是比列表快吗？','不一定。它主要改善惰性处理与内存使用；速度要按真实场景测量。','python'],
 ['装饰器入门','装饰器接收一个函数并返回另一个函数，常用于在调用前后添加行为。先理解函数也可以作为值传递。', 'from functools import wraps\n\ndef announce(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        print("开始执行")\n        return fn(*args, **kwargs)\n    return wrapper\n\n@announce\ndef greet(name):\n    return f"你好，{name}"\n\nprint(greet("小林"))', '写一个记录函数耗时的装饰器，使用 time.perf_counter。确认装饰后保留原函数返回值。', ['装饰器接收并返回函数','参数正确传递','原始返回值不丢失'], 'wrapper 中要返回被包装函数的结果。不要在定义装饰器时提前调用目标函数。','@announce 等价于什么？','函数定义后执行 greet = announce(greet)，把 greet 绑定到包装后的函数。','python'],
 ['类型注解与代码组织','类型注解让读者和工具知道预期输入输出，但 Python 不会只因为注解就自动校验运行时数据。', 'from typing import List\n\ndef average(scores: List[float]) -> float:\n    if not scores:\n        raise ValueError("成绩不能为空")\n    return sum(scores) / len(scores)', '给待办管理器的主要函数加类型注解和说明，减少全局状态。编写空列表测试。', ['关键参数与返回值有注解','函数职责清楚','知道类型注解不等于输入校验'], '你电脑已有 Python 3.10 可运行这些示例。类型错误仍要通过测试或类型检查工具发现。','传入错误类型会自动被注解拦截吗？','不会。需要运行时校验、静态类型检查或由业务逻辑处理。','python'],
 ['HTTP API 请求','API 是程序之间约定的访问接口。HTTP 响应有状态码和响应体；JSON 解析与网络请求是不同的失败步骤。', 'import json\nfrom urllib.request import urlopen\n\nurl = "https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&current=temperature_2m"\nwith urlopen(url, timeout=10) as response:\n    data = json.load(response)\nprint(data["current"]["temperature_2m"])', '实现固定城市坐标的天气查询。检查响应字段并处理超时、网络失败和缺失字段；保留一个本地 JSON 样例用于离线测试。', ['解析并输出温度与单位','请求设置超时','网络不可用时输出明确提示'], '示例使用上海固定坐标，不采集设备位置。联网接口可能变化；先用保存的样例验证解析。错误响应不要当作成功。','为什么设置 timeout？','防止远端无响应时程序无限等待。超时后应告诉用户，并按需要有限重试。','network'],
 ['async 与 await 入门','协程在等待 I/O 时允许其他任务推进。asyncio.sleep 不阻塞事件循环；await 表示等待可等待对象的结果。', 'import asyncio\n\nasync def task(name):\n    await asyncio.sleep(1)\n    return name\n\nasync def main():\n    print(await asyncio.gather(task("A"), task("B")))\n\nasyncio.run(main())', '对比顺序等待两个任务与 gather 并发等待的耗时。解释为什么异步不会让纯计算自动变快。', ['能运行异步入口','测量两种执行方式耗时','能解释等待时协程切换'], '协程不能只调用不 await。不要在异步函数中用 time.sleep 模拟非阻塞等待。','async def 调用后立刻执行完吗？','调用会得到协程对象，要 await 或通过事件循环调度才会执行。','async'],
 ['Git 基础与版本记录','Git 记录文件的版本。暂存区选择下一次提交内容，commit 创建快照；不要把密码或 API Key 写进代码和提交。', '# 终端命令\ngit init\ngit status\ngit add README.md exercises\ngit commit -m "记录第一个月 Python 练习"', '为自己的练习创建本地 Git 仓库。修改一处代码，查看 diff 并提交。确认 .venv、缓存和密钥文件不在提交中。', ['能查看工作区和暂存区状态','能完成本地提交并查看历史','能解释未跟踪与已修改文件'], '未配置身份时 Git 会提示设置姓名和邮箱；按自己信息配置。推送远端是可选步骤，先掌握本地版本记录。','git add 与 commit 有什么区别？','add 把选定的修改加入暂存区；commit 把暂存区内容保存成一个有说明的版本快照。','git'],
 ['第一个月综合验收','把输入输出、数据结构、函数、文件、异常和模块组合起来，独立交付一个小项目。用实际运行结果判断是否掌握。', '# 综合验收流程\n# 1. 从空文件实现关键功能\n# 2. 运行正常与错误输入\n# 3. 退出并重启检查数据\n# 4. 写 README 和本月复盘', '完善天气项目的错误处理和 README。独立重写关键函数，结合待办管理器证明持久化能力；写一份本月复盘。', ['可以独立完成小型 Python 项目','能解释输入、函数、异常与持久化','项目运行步骤与测试结果完整'], '先复盘不熟悉的知识点，再实现最小路径。用至少八组输入检查边界，不要为了凑行数增加无用代码。','达到第一阶段门槛的证据是什么？','独立完成可运行项目、能改需求并修复错误、有测试结果和复盘，而不是看完教程。','python']
];
const WEEKS = WEEK_SPECS.map((spec,index)=>({id:index+1,title:spec[0],deliverable:spec[1],concepts:spec[2],resource:spec[3],stage:STAGES.find(s=>index+1>=s.range[0]&&index+1<=s.range[1]).id}));
const LESSONS = WEEKS.flatMap(w=>Array.from({length:7},(_,i)=>{
  const id=(w.id-1)*7+i+1;
  if(id<=28){const x=FIRST_MONTH[id-1];return {id,week:w.id,stage:w.stage,title:x[0],explanation:x[1],example:x[2],exercise:x[3],checks:x[4],hint:x[5],question:x[6],answer:x[7],resource:x[8],detailed:true};}
  const concept=w.concepts[i];
  const title=i<5?concept:i===5?'整合实践 · '+w.title:'复习与验收 · '+w.title;
  const exercise=i<5?`围绕「${concept}」完成一个最小实验，保留源码、输入与实际输出。把它接入本周交付物：${w.deliverable}。从第 5 周开始，每周另安排 2–3 道基础算法题。`:i===5?`整合本周五个知识点：${w.concepts.join('、')}。完成「${w.deliverable}」，记录运行方式和至少三个失败场景。`:`关闭参考材料，重写本周一个核心功能。为「${w.deliverable}」记录验收结果、仍未掌握的内容和下周的修正计划。`;
  return {id,week:w.id,stage:w.stage,title,detailed:false,explanation:i<5?`今天聚焦「${concept}」。先查阅本周官方资料中对应章节，用自己的话写下定义、适用场景和限制；再通过实验观察实际行为。本周目标是：${w.deliverable}。`:'把知识点变成可以运行、复现和解释的项目。以实际测试结果为依据判断是否掌握。',example:null,exercise,checks:i<5?[`能解释 ${concept} 的作用与限制`,'有可运行的最小实验与实际输出','至少验证一个边界或失败场景']:['交付物可按 README 复现','至少三个验收场景有记录','能独立解释关键设计和未解决问题'],hint:'先实现最小路径，再加入边界处理。查阅官方文档对应章节；把错误信息、假设和验证结果记入笔记。后续周是实践任务指引，需搭配资料学习。',question:i<5?`「${concept}」解决了什么问题？什么情况下不适用？`:'你如何证明本周交付物满足要求？',answer:'用你今天的实验、输入输出和失败案例来回答。记录适用场景、代价与限制；答案应由实际结果支持。',resource:w.resource};
}));
const PROJECTS = [
 {id:1,title:'任务管理系统',weeks:'第 9–16 周',stage:3,stack:'Python · FastAPI · PostgreSQL · Redis · Docker',desc:'把后端基础串起来，做一个从登录到部署都能独立运行的服务。',checks:['注册与登录，密码安全存储','任务增删改查与分页','用户之间的数据隔离','缓存过期和一致性验证','关键路径和权限测试','Docker 部署与故障排查文档']},
 {id:2,title:'AI 聊天助手',weeks:'第 17–20 周',stage:4,stack:'FastAPI · LLM API · PostgreSQL · SSE',desc:'让模型调用变成可管理、可观测的多轮聊天体验。',checks:['多轮上下文和历史会话','流式响应与客户端断开处理','结构化输出及字段校验','超时、失败与有限重试','Token 用量和耗时记录','可复现演示与测试']},
 {id:3,title:'企业知识库问答系统',weeks:'第 21–28 周',stage:5,stack:'FastAPI · Qdrant · Embedding · Reranker · LLM',desc:'让知识进入检索链路，以评测结果判断优化是否有效。',checks:['文档解析、清洗、切分','索引更新与元数据过滤','向量、BM25 与混合检索','答案引用与无依据拒答','50–100 条人工校验问题','有指标与错误案例的评测报告']},
 {id:4,title:'多智能体办公平台',weeks:'第 29–40 周',stage:6,stack:'FastAPI · LangGraph · MCP · RAG · PostgreSQL · Redis',desc:'可靠地规划、执行与恢复任务，并能说明协作的实际必要性。',checks:['任务规划与工具参数校验','执行步数、预算与超时限制','审批、中断与进程重启恢复','用户隔离的长期记忆','MCP 服务与必要的多 Agent 协作','执行轨迹、失败测试与部署说明']}
];
if(typeof module!=='undefined') module.exports={STAGES,WEEKS,LESSONS,RESOURCES,PROJECTS};
