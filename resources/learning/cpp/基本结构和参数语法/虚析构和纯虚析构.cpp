#include <iostream>
using namespace std;

//虚析构主要是用来解决内存泄漏的问题   --如果父类的指针指向派生类的对象，如果父类的析构函数不是虚函数的话，就会调用不到子类的析构函数

class BaseA{
public:
    BaseA(){
    }
    ~BaseA(){
        cout<<"BaseA析构函数被调用"<<endl;
    }
};

class SonA: public BaseA{
public:
    SonA():value(NULL){  //初始化列表
        value = new int(10);
    };
    int* value;
    ~SonA(){
        delete value;
        cout<<"SonA析构函数被调用"<<endl;
    };
};


class BaseB{
public:
    BaseB(){
    }
    virtual ~BaseB(){  //虚析构函数
        cout<<"BaseB析构函数被调用"<<endl;
    }
};

class SonB: public BaseB{
public:
    SonB():value(NULL){  //初始化列表
        value = new int(10);
    };
    int* value;
    ~SonB(){
        delete value;
        cout<<"SonB析构函数被调用"<<endl;
    };
};


class BaseC{
public:
    BaseC(){
    }
    virtual ~BaseC() =0; //纯虚析构函数
};

BaseC::~BaseC(){  //纯虚析构函数也要有函数体   //需要在类外实现，不然会报错
    cout<<"BaseC析构函数被调用"<<endl;
}


class SonC: public BaseC{
public:
    SonC():value(NULL){  //初始化列表
        value = new int(10);
    };
    int* value;
    ~SonC(){
        delete value;
        cout<<"SonC析构函数被调用"<<endl;
    };
};

int main(){
    BaseA *a =new SonA();  //父类的指针可以指向子类对象
    delete a;  //输出：BaseA析构函数被调用
    cout<<"-----------------"<<endl;
    BaseB *b =new SonB();  //父类的指针可以指向子类对象
    delete b;  //输出：SonB析构函数被调用  BaseB析构函数被调用
    cout<<"-----------------"<<endl;
    BaseC *c =new SonC();   //虚析构函数不可以实例化对象，这相当于定义了一个指向对象的指针而已
    delete c;
    // BaseC c1; //错误，纯虚析构函数不可以实例化对象
    return 0; //输出：SonC析构函数被调用  BaseC析构函数被调用

}