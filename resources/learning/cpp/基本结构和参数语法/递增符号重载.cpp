#include <iostream>
#include <string>
using namespace std;

class Complex {
    friend ostream &operator<<(ostream &out, const Complex &c);
public:
    Complex() : real(0), imag(0) {} //默认构造函数
    Complex(int real, int imag){
        this->real = real;
        this->imag = imag;
    }  //构造函数重载

    Complex operator++(){  //重载前置++
        this ->real += 1;
        return *this;
    }
    Complex operator++(int){  //重载后置++
        Complex temp = *this; //保存当前对象的值
        this ->real += 1;
        return temp; //返回保存的值（未递增前的值）
    }

private:
    double real; // 复数的实部
    double imag; // 复数的虚部
};

ostream& operator<<(ostream &out, const Complex &c) {   //重载输出运算符<<    
    //cout只能输出内置类型（如int、double等）和标准库中已重载的类型（如string等），不能直接输出自定义类型（如Complex类）
    //如果不重载的话，就需要写一个输出函数，来调用输出自定义类型，非常麻烦，且耗费内存
    out << c.real << " + " << c.imag << "i";  //等于 cout << c.real << " + " << c.imag << "i";
    return out;
}


int main() {
    int x=1;
    Complex c1(3,4);
    cout << "c1 = " << c1 << endl;  //使用重载的<<运算符
    // ++c1;  //使用重载的前置++运算符
    // cout << "After ++, c1 = " << c1 << endl;   
    cout << ++(++x) << endl;
    cout << x << endl;
    cout <<  ++(++c1) << endl;   
    cout << "c1递增之后 = " << c1 << endl;    //输出c1递增之后 = 4 + 4i。为什么不是5 + 4i？因为++C1返回了一个新的临时对象，并没有修改c1本身


    //如果想要修改c1本身，可以将前置++运算符重载函数的返回值类型改为Complex&，并返回*this的引用，如下所示：
    /*
        Complex &operator++(){  //重载前置++
        this ->real += 1;
        return *this;
    }
    */


    /*
        void operator++(){  //重载前置++
        this ->real += 1;
    }
        如果是用上面的写法，则无法进行链式调用，因为返回值类型是void，无法继续调用++运算符
        需要将返回值类型改为Complex类型，返回当前对象的引用或值      链式调用（Chaining）是一种设计方法，它允许你通过一个对象的多个方法连续调用，而不需要在每次调用后重新引用对象。
        两次调用++方法
    */
   Complex c2(5,6);
   cout << "c2 = " << c2 << endl;  //使用重载的<<运算符
   cout << c2++ << endl;   //使用重载的后置++运算符
   cout << "c2递增之后 = " << c2 << endl;    //输出c2递增之后 = 6 + 6i

   //cout << (((a++)++)++) << endl;  //错误，后置++返回的是临时对象，无法对临时对象再次使用后置++运算符

    return 0;
}