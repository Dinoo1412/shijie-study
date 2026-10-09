#include <iostream>
#include <cstdint>
using namespace std;

//十六位地址取最后四位
string getHex(uintptr_t x){
    char buff[10];
    sprintf_s(buff, "%X", (unsigned int)(x & 0xFFFF)); //C++ 提供了 uintptr_t 类型，它是一个无符号整数类型，专门用于存储指针值，能够保证跨平台的兼容性。
    return (string)buff;
}



int main(){
    int a[3][4]={
        {1,2,3,4},
        {4,5,6,7},
        {7,8,9,10}
    };
    for (int i=0; i<3; ++i){
        for(int j= 0;j<4;++j){
            if(j){
                cout << ',' ;
            }
        int *p =&a[i][j]; 
        cout<< getHex((uintptr_t) p);
        }
        cout << endl;

    }
    //指针数组，数组里面全部都是指针元素，一个数组里含有的元素为指针类型的时候，它就被成为指针数组    地址的地址
    int *q[3]={a[0],a[1],a[2]}; //其实其中的a[0]=&a[0][0],3代表q数组长度，
    //数组指针 ——也叫行指针
    int (*p)[4];  //其中4代表指向长度为4的一个a数组，int (*p)[4]定义了一个指向含有4个元素的一维数组的指针，本质是一个值
    p = &a[0];
    

    cout<< "1、指针+i"<<endl;
    //   q+i   \  p+i

    cout << "数组指针" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(p+i));
        cout << "第" << i << "个(a数组)[4]数组的地址是" << s << endl; 

    }
    cout << "指针数组" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(q+i));
        cout << "第" << i << "个q元素的地址是" << s << endl; //第i行地址的地址

    }
    // *(a+i)与a[i]与a+1是等价的，都是首地址。
    // 可能认为 * (a+i)与a+1不应该等价呀，a+1是地址，那 *(a+i)应该是该地址上储存的内容呀。
    // 对于这个问题，因为二维数组比较特殊，不像一维数组，所以这个地方特别注意一下就行。

    cout<< "2、*(指针+i)"<<endl;
    //   *(q+i)   \  *(p+i)

    cout << "数组指针" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(*(p+i)));
        cout << "a数组的第" << i << "i行第0个元素的地址是" << s << endl; 

    }
    cout << "指针数组" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(*(q+i)));  //q+i是&a[i]，解引用之后是a[i]
        cout << "a数组的第" << i << "i行第0个元素的地址是" << s << endl; 

    }


    cout<< "3、*(指针+i)+j"<<endl;
    //   *(q+i)+j   \  *(p+i)+j

    cout << "数组指针" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(*(p+i)+2));
        cout << "a数组的第" << i << "i行第2个元素的地址是" << s << endl; 

    }
    cout << "指针数组" << endl;
    for (int i=0;i<3;++i){
        string s= getHex((uintptr_t)(*(q+i)+ 1));  //q+i是&a[i]，解引用之后是a[i]
        cout << "a数组的第" << i << "i行第1个元素的地址是" << s << endl; 

    }








    return 0;
}
