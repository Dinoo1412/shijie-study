#include <iostream>
using namespace std;

//malloc free C语言 函数 内存管理
//new delete  C++  运算符

/*
  int *ptr = new int 在堆里面找到一块int变量类型的空间，并且返回指向此内存空间的指针
  如果后续代码执行中不进行内存释放，则会出现内存泄露
  int *a 是存储在栈上的，但是new为其创建一个存储在堆区的内存空间
  所以即使return a中 a 已经被函数销毁了，但是a指向new对象的内存并没有销毁 
*/

int *getV(int v){
    int *a= new int(v); 
    cout  << a << endl;
    return a;
}

int *getGaplist (int *arr,int size){

  int *p=new int[size-1];
  //如果我要返回一个a数组
  //int a[size-1]; return a; 这样是不行的，因为a在栈上，不能作为返回值返回
  for(int i=0;i<size-1;++i){
    p[i]=arr[i+1]-arr[i];

  }
  return p;

}

int main(){
    int *p =getV(1314);  
    /*
    运行之后栈区的指针a被释放掉，但释放之前通过return返回给了main里面的指针p
    */
    cout << *p << endl;  //所以，这里还是可以解引用，得到堆上内存存储的值
    cout << p << endl;
    delete p;
    cout << *p << endl;   //出现野指针错误

    int arr[]={1,2,3,4,5,7,9,0};
    int *ap=getGaplist(arr,8);
    for(int i=0;i<7;++i){
    
    cout<<ap[i]<<"  ";
  
  }
  cout<<endl;
  delete[] ap; //如果不加上[]，删除的就是数组首个地址
  ap=NULL;
  /*
  delete 后最好将指针赋值为ＮＵＬＬ
  因为delete并不是将指针删掉，而是释放指针所指向的那块内存，delete后其实该指针还是指向了该内存空间
  如果没有清零，再次使用会有异常
  */

    return 0;
}