#include <iostream>
#include <string>
#include <vector>
using namespace std;
	// 成员函数重载本质调用：person p3 = p1.operator+(p2)  
	// 全局函数重载本质调用: person p3 = operator+(p1, p2)

class Complex{
    // friend void operator<<(ostream &out, Complex &c);
    friend ostream& operator<<(ostream &out, Complex &c);
public:
    Complex(double r=0.0, double i=0.0):real(r), imag(i) {} //构造函数，使用成员初始化列表

    // 重载+运算符
    Complex operator+(const Complex &c) const {
        return Complex(real + c.real, imag + c.imag);
    }

    // 重载*运算符
    Complex operator*(const Complex &c) const {
        return Complex(real * c.real - imag * c.imag,
                       real * c.imag + imag * c.real);
    }

    void display() const {
        cout << real << " + " << imag << "i" << endl;
    }

private:
    double real; //实部
    double imag; //虚部
};

// 重载<<运算符作为普通函数
// void operator<<(ostream &out, Complex &c) {
//     out << c.real << " + " << c.imag << "i"; 
// }
ostream& operator<<(ostream &out, Complex &c) {
    out << c.real << " + " << c.imag << "i"; 
    return out;
}

int main() {
    Complex c1(2.0, 3.0); //创建第一个复数对象
    Complex c2(4.0, 5.0); //创建第二个复数对象

    Complex sum = c1 + c2; //使用重载的+运算符
    Complex product = c1 * c2; //使用重载的*运算符

    cout << "Sum: ";
    sum.display(); //显示和

    cout << "Product: ";
    product.display(); //显示积

    // operator<<(cout, sum); //使用重载的<<运算符
    cout<< sum <<endl;  //使用重载的<<运算符
    cout << endl;

    return 0;
}


// C++运算符重载的两种方式
// 1. 成员函数重载运算符

/*
// 定义一个代表复数的Complex类
class Complex {
private:
    double real; // 存储复数的实部
    double imag; // 存储复数的虚部

public:
    // 构造函数，允许创建具有特定实部和虚部的复数
    Complex(double r, double i) : real(r), imag(i) {}

    // 重载+运算符作为成员函数。它接收另一个Complex对象作为参数，并返回两个复数相加的结果
    Complex operator+(const Complex& other) const {
        // 创建并返回一个新的Complex对象，其实部和虚部分别是当前对象(this指针指向的对象)
        // 和参数对象other的实部和虚部之和
        return Complex(this->real + other.real, this->imag + other.imag);
    }

    // 可选：添加一个显示函数，以便打印复数的值
    void display() const {
        std::cout << real << " + " << imag << "i" << std::endl;
    }
};
*/


// 2. 全局函数重载运算符  --非成员函数

/*
#include <iostream>
// 定义Complex类
class Complex {
private:
    double real; // 复数的实部
    double imag; // 复数的虚部
public:
    // 构造函数，初始化复数的实部和虚部
    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}
    // 声明运算符重载函数为友元，使它可以访问私有成员
    friend Complex operator+(const Complex& lhs, const Complex& rhs);
    // 可选：实现一个显示函数来打印复数
    void display() const {
        std::cout << real << " + " << imag << "i" << std::endl;
    }
};
// 以非成员函数（友元函数）的形式实现+运算符重载
Complex operator+(const Complex& lhs, const Complex& rhs) {
    // 直接访问两个操作数的私有成员，计算它们的和
    return Complex(lhs.real + rhs.real, lhs.imag + rhs.imag);
}
// 主函数，用于演示如何使用重载的“+”运算符
int main() {
    Complex c1(5, 4), c2(2, 10), c3;
    // 使用重载的“+”运算符将两个复数相加
    c3 = c1 + c2;
    // 显示结果
    c3.display(); // 应输出: 7 + 14i
    return 0;
}
*/