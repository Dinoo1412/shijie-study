#include <iostream>
using namespace std;
//继承中，构造链里，先构造的后析构，就像括号内的优先级一样嵌套
class Animal{
public:
    Animal(){
        cout<< "Animal 的构造函数调用" << endl;
    }
    ~Animal(){
        cout<< "Animal 的析构函数调用" << endl;
    }
};

class Cat:public Animal{
public:
    Cat(){
        cout<< "Cat 的构造函数调用" << endl;
    }
    ~Cat(){
        cout<< "Cat 的析构函数调用" << endl;
    }
};

class BossCat:public Cat{
public:
    BossCat(){
        cout<< "BossCat 的构造函数调用" << endl;
    }
    ~BossCat(){
        cout<< "BossCat 的析构函数调用" << endl;
    }
};

void Test(){
    // Animal a;
    /*
    Animal 的构造函数调用
    Animal 的析构函数调用
    */


    // Cat c;
    /*
    Animal 的构造函数调用
    Cat 的构造函数调用
    Cat 的析构函数调用
    Animal 的析构函数调用
    */
    BossCat b;
    /*
    Animal 的构造函数调用
    Cat 的构造函数调用
    BossCat 的构造函数调用
    BossCat 的析构函数调用
    Cat 的析构函数调用
    Animal 的析构函数调用
    */


}
int main(){
    Test();
    return 0;
}
