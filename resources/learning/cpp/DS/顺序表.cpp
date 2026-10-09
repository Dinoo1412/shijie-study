#include <iostream>
using namespace std;


#define elementType int

struct SequentialList{
    elementType* elements;  //存储元素的数组
    int size;  //元素个数，顺序表当前长度
    int capacity;  //数组的大小
};

//顺序表的初始化
void initializeList(SequentialList *list ,int capacity){
    list->elements =new elementType[capacity];  //new分配指定容量的数组，并将地址赋值给list->elements成员变量
    list->size =0;
    list->capacity = capacity;
}

//顺序表的销毁
void destroyList(SequentialList *list){
    delete[] list->elements;
}

//顺序表当前个数
bool isEmpty(SequentialList *list){
    return list->size ==0;
}
int SequentialListSize(SequentialList *list){
    return list->size;
}

//顺序表的插入
void insertElement(SequentialList *list,int index,elementType element){
    if(index<0 || index>list->size){  //检查插入位置是都合法
        throw std::invalid_argument("Invalid index");
    }
    if(list->size == list->capacity){    //顺序表满了，则进行扩容 
        int newCapacity =list->capacity * 2;
        elementType* newElements = new elementType[newCapacity];  
        for(int i=0;i<list->size;i++){
            newElements[i] = list->elements[i];
        }
        delete[] list->elements;
        list->elements = newElements;
        list->capacity = newCapacity;
    }
    for(int i= list->size;i>index;i--){
        list->elements[i]=list->elements[i-1]; //将元素进行后移
    }
    list->elements[index]=element;
    list->size++;
}


//顺序表元素删除
void deleteElement(SequentialList *list,int index){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    for(int i=index;i<list->size;i++){
        list->elements[i]=list->elements[i+1]; //将后续的元素进行前移
    }
    list->size--;
}

//顺序表的元素查找
int findElement(SequentialList *list,elementType element){
    for(int i=0;i<list->size;i++){
        if(list->elements[i]==element){
            return i;
        }
    }
    return -1; //没有找到
}

//顺序表的元素索引
elementType getElement(SequentialList *list,int index){
    if(index<0 || index>list->size){
        throw std::invalid_argument("invalid index");
    }
    return list->elements[index];
}

//顺序表的元素修改
void updateElement(SequentialList *list, int index,elementType element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("invalid index");
    }
    list->elements[index]=element;
}

int main(){
    SequentialList mylist;
    initializeList(&mylist,5); //初始化顺序表，容量为5
    insertElement(&mylist,0,10);
    insertElement(&mylist,1,20);
    insertElement(&mylist,1,15); //在索引1处插入15
    cout<<"Element at index 0: "<<getElement(&mylist,0)<<endl; //输出索引0处的元素
    cout<<"Element at index 1: "<<getElement(&mylist,1)<<endl; //输出索引1处的元素
    cout<<"Element at index 2: "<<getElement(&mylist,2)<<endl; //输出索引2处的元素
    cout<<"List size: "<<SequentialListSize(&mylist)<<endl; //输出顺序表的大小
    deleteElement(&mylist,0);
    cout<<"Element at index 0: "<<getElement(&mylist,0)<<endl; //输出索引0处的元素
    cout<<"Element at index 1: "<<getElement(&mylist,1)<<endl; //输出索引1处的元素
    cout<<"Element at index 2: "<<getElement(&mylist,2)<<endl; //输出索引2处的元素
    return 0;
}