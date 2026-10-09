'use strict';
const LEARNING_MATERIALS=[
  {
    "id": "database-design",
    "title": "数据库设计案例",
    "category": "后端与数据库",
    "kind": "note",
    "url": "resources/learning/notes/database-design.md",
    "obsidianFile": "01 学习资料/数据库设计案例.md"
  },
  {
    "id": "git-commit-convention",
    "title": "Git 提交规范",
    "category": "工程工具",
    "kind": "note",
    "url": "resources/learning/notes/git-commit-convention.md",
    "obsidianFile": "01 学习资料/Git 提交规范.md"
  },
  {
    "id": "git-guide",
    "title": "Git 使用指南",
    "category": "工程工具",
    "kind": "note",
    "url": "resources/learning/notes/git-guide.md",
    "obsidianFile": "01 学习资料/Git 使用指南.md"
  },
  {
    "id": "hash-table",
    "title": "哈希表",
    "category": "算法与数据结构",
    "kind": "note",
    "url": "resources/learning/notes/hash-table.md",
    "obsidianFile": "01 学习资料/哈希表.md"
  },
  {
    "id": "learning-links",
    "title": "学习链接",
    "category": "学习导航",
    "kind": "note",
    "url": "resources/learning/notes/learning-links.md",
    "obsidianFile": "01 学习资料/学习链接.md"
  },
  {
    "id": "loops",
    "title": "循环与遍历",
    "category": "语言基础",
    "kind": "note",
    "url": "resources/learning/notes/loops.md",
    "obsidianFile": "01 学习资料/循环与遍历.md"
  },
  {
    "id": "modern-cpp",
    "title": "现代 C++ 语法笔记",
    "category": "语言基础",
    "kind": "note",
    "url": "resources/learning/notes/modern-cpp.md",
    "obsidianFile": "01 学习资料/现代 C++ 语法笔记.md"
  },
  {
    "id": "prefix-sum",
    "title": "前缀和",
    "category": "算法与数据结构",
    "kind": "note",
    "url": "resources/learning/notes/prefix-sum.md",
    "obsidianFile": "01 学习资料/前缀和.md"
  },
  {
    "id": "typora-guide",
    "title": "Typora 使用指南",
    "category": "笔记工具",
    "kind": "note",
    "url": "resources/learning/notes/typora-guide.md",
    "obsidianFile": "01 学习资料/Typora 使用指南.md"
  },
  {
    "id": "cpp-9",
    "title": "linkedlist",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/linkedlist.cpp",
    "obsidianFile": "02 C++ 练习/DS/linkedlist.md"
  },
  {
    "id": "cpp-10",
    "title": "sequentiList_2",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentiList_2.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentiList_2.md"
  },
  {
    "id": "cpp-11",
    "title": "sequentiList_3",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentiList_3.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentiList_3.md"
  },
  {
    "id": "cpp-12",
    "title": "sequentiList_4",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentiList_4.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentiList_4.md"
  },
  {
    "id": "cpp-13",
    "title": "sequentialList_1",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentialList_1.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentialList_1.md"
  },
  {
    "id": "cpp-14",
    "title": "sequentialList_5",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentialList_5.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentialList_5.md"
  },
  {
    "id": "cpp-15",
    "title": "sequentialList_6",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/sequentialList_6.cpp",
    "obsidianFile": "02 C++ 练习/DS/sequentialList_6.md"
  },
  {
    "id": "cpp-16",
    "title": "单向链表",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/单向链表.cpp",
    "obsidianFile": "02 C++ 练习/DS/单向链表.md"
  },
  {
    "id": "cpp-17",
    "title": "顺序表",
    "category": "DS",
    "kind": "cpp",
    "url": "resources/learning/cpp/DS/顺序表.cpp",
    "obsidianFile": "02 C++ 练习/DS/顺序表.md"
  },
  {
    "id": "cpp-18",
    "title": "stl",
    "category": "STL",
    "kind": "note",
    "url": "resources/learning/cpp/STL/stl.md",
    "obsidianFile": "02 C++ 练习/STL/stl.md"
  },
  {
    "id": "cpp-19",
    "title": "vector",
    "category": "STL",
    "kind": "cpp",
    "url": "resources/learning/cpp/STL/vector.cpp",
    "obsidianFile": "02 C++ 练习/STL/vector.md"
  },
  {
    "id": "cpp-20",
    "title": "const修饰成员函数_常函数",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/const修饰成员函数_常函数.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/const修饰成员函数_常函数.md"
  },
  {
    "id": "cpp-21",
    "title": "shuzu",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/shuzu.c",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/shuzu.md"
  },
  {
    "id": "cpp-22",
    "title": "this指针",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/this指针.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/this指针.md"
  },
  {
    "id": "cpp-23",
    "title": "为什么要重载&初始化方法",
    "category": "基本结构和参数语法",
    "kind": "note",
    "url": "resources/learning/cpp/基本结构和参数语法/为什么要重载&初始化方法.md",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/为什么要重载&初始化方法.md"
  },
  {
    "id": "cpp-24",
    "title": "关系运算符重载",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/关系运算符重载.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/关系运算符重载.md"
  },
  {
    "id": "cpp-25",
    "title": "内存泄漏",
    "category": "基本结构和参数语法",
    "kind": "note",
    "url": "resources/learning/cpp/基本结构和参数语法/内存泄漏.md",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/内存泄漏.md"
  },
  {
    "id": "cpp-26",
    "title": "内存管理",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/内存管理.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/内存管理.md"
  },
  {
    "id": "cpp-27",
    "title": "函数指针类型",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/函数指针类型.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/函数指针类型.md"
  },
  {
    "id": "cpp-28",
    "title": "函数调用运算符重载",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/函数调用运算符重载.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/函数调用运算符重载.md"
  },
  {
    "id": "cpp-29",
    "title": "初始化列表",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/初始化列表.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/初始化列表.md"
  },
  {
    "id": "cpp-30",
    "title": "友元_friend",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/友元_friend.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/友元_friend.md"
  },
  {
    "id": "cpp-31",
    "title": "堆区和栈区",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/堆区和栈区.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/堆区和栈区.md"
  },
  {
    "id": "cpp-32",
    "title": "多态",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/多态.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/多态.md"
  },
  {
    "id": "cpp-33",
    "title": "多继承",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/多继承.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/多继承.md"
  },
  {
    "id": "cpp-34",
    "title": "封装",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/封装.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/封装.md"
  },
  {
    "id": "cpp-35",
    "title": "属性私有化+代码调试方法",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/属性私有化+代码调试方法.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/属性私有化+代码调试方法.md"
  },
  {
    "id": "cpp-36",
    "title": "常量引用",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/常量引用.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/常量引用.md"
  },
  {
    "id": "cpp-37",
    "title": "平衡二叉树",
    "category": "基本结构和参数语法",
    "kind": "note",
    "url": "resources/learning/cpp/基本结构和参数语法/平衡二叉树.md",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/平衡二叉树.md"
  },
  {
    "id": "cpp-38",
    "title": "引用",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/引用.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/引用.md"
  },
  {
    "id": "cpp-39",
    "title": "引用传递",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/引用传递.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/引用传递.md"
  },
  {
    "id": "cpp-40",
    "title": "引用修改数组值",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/引用修改数组值.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/引用修改数组值.md"
  },
  {
    "id": "cpp-41",
    "title": "引用的定义",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/引用的定义.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/引用的定义.md"
  },
  {
    "id": "cpp-42",
    "title": "拷贝构造函数",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/拷贝构造函数.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/拷贝构造函数.md"
  },
  {
    "id": "cpp-43",
    "title": "指针函数和函数指针",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/指针函数和函数指针.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/指针函数和函数指针.md"
  },
  {
    "id": "cpp-44",
    "title": "指针和数组",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/指针和数组.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/指针和数组.md"
  },
  {
    "id": "cpp-45",
    "title": "指针常量和常量指针",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/指针常量和常量指针.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/指针常量和常量指针.md"
  },
  {
    "id": "cpp-46",
    "title": "指针引用",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/指针引用.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/指针引用.md"
  },
  {
    "id": "cpp-47",
    "title": "数组指针和指针数组",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/数组指针和指针数组.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/数组指针和指针数组.md"
  },
  {
    "id": "cpp-48",
    "title": "数组输出",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/数组输出.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/数组输出.md"
  },
  {
    "id": "cpp-49",
    "title": "构造函数",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/构造函数.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/构造函数.md"
  },
  {
    "id": "cpp-50",
    "title": "析构函数",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/析构函数.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/析构函数.md"
  },
  {
    "id": "cpp-51",
    "title": "纯虚函数和抽象类",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/纯虚函数和抽象类.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/纯虚函数和抽象类.md"
  },
  {
    "id": "cpp-52",
    "title": "结构体",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/结构体.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/结构体.md"
  },
  {
    "id": "cpp-53",
    "title": "结构体参数传递",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/结构体参数传递.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/结构体参数传递.md"
  },
  {
    "id": "cpp-54",
    "title": "结构体和封装的区别",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/结构体和封装的区别.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/结构体和封装的区别.md"
  },
  {
    "id": "cpp-55",
    "title": "结构体和联合体",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/结构体和联合体.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/结构体和联合体.md"
  },
  {
    "id": "cpp-56",
    "title": "结构体的属性指向",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/结构体的属性指向.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/结构体的属性指向.md"
  },
  {
    "id": "cpp-57",
    "title": "继承中构造和析构函数",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/继承中构造和析构函数.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/继承中构造和析构函数.md"
  },
  {
    "id": "cpp-58",
    "title": "继承同名属性访问",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/继承同名属性访问.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/继承同名属性访问.md"
  },
  {
    "id": "cpp-59",
    "title": "继承方式",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/继承方式.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/继承方式.md"
  },
  {
    "id": "cpp-60",
    "title": "继承的语法",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/继承的语法.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/继承的语法.md"
  },
  {
    "id": "cpp-61",
    "title": "联合体的地址",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/联合体的地址.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/联合体的地址.md"
  },
  {
    "id": "cpp-62",
    "title": "虚析构和纯虚析构",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/虚析构和纯虚析构.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/虚析构和纯虚析构.md"
  },
  {
    "id": "cpp-63",
    "title": "赋值运算符重载",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/赋值运算符重载.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/赋值运算符重载.md"
  },
  {
    "id": "cpp-64",
    "title": "运算符重载",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/运算符重载.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/运算符重载.md"
  },
  {
    "id": "cpp-65",
    "title": "递增符号重载",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/递增符号重载.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/递增符号重载.md"
  },
  {
    "id": "cpp-66",
    "title": "野指针",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/野指针.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/野指针.md"
  },
  {
    "id": "cpp-67",
    "title": "静态成员变量",
    "category": "基本结构和参数语法",
    "kind": "cpp",
    "url": "resources/learning/cpp/基本结构和参数语法/静态成员变量.cpp",
    "obsidianFile": "02 C++ 练习/基本结构和参数语法/静态成员变量.md"
  }
];
if(typeof module!=='undefined')module.exports={LEARNING_MATERIALS};
