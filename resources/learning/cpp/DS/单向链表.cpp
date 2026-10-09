#include <iostream>
#include <stdexcept>
using namespace std;

#define eleType int

struct ListNode {
    eleType data;
    ListNode *next;
    ListNode(eleType x):data(x),next(NULL){}   // 结构体构造函数，初始化列表
};

class LinkedList{
private:
    ListNode* head;
    int size;

public:
    LinkedList():head(NULL),size(0){}
    ~LinkedList();    // 析构函数，释放在堆上的空间
    void insert(int i, eleType value);
    void remove(int i);
    int find(eleType value);
    // ListNode* find(eleType value);
    ListNode* get(int i);
    void update(int i,eleType value);
    void print();


};

LinkedList::~LinkedList(){ //从头节点开始向后遍历，一直遍历到空为止
    ListNode* curr = head;
    while(curr!=NULL){
        ListNode* temp = curr;
        curr = curr->next;
        delete temp;
    }
}

void LinkedList::insert(int i, eleType value){
    if(i<0 || i>size){
        // throw std::out_of_range("Invalid position"); 
        //之前std::invalid_argument是抛出异常参数：bar函数接受一个std::vector<int>和一个索引index。
        //如果索引是负数，函数会抛出一个std::invalid_argument异常。如果索引超出向量的大小，函数会抛出一个std::out_of_range异常。
    }
    ListNode* newNode = new ListNode(value);
    if(i==0){
        newNode->next =head;
        head = newNode;
    }else{
        ListNode* curr = head;
        for(int j=0;j<i-1;j++){
            curr =curr->next;
        }
        newNode->next=curr->next; //problem
        curr->next=newNode;
    }
    size++;
}

void LinkedList::remove(int i){
    if(i<0 || i>size){
        throw std::out_of_range("Invalid position");
    }
    if(i == 0){
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }else{
        ListNode* curr = head;
        for(int j = 0 ;j <i -1; j++){
            curr=curr->next;
        }
        ListNode *temp = curr->next;
        curr->next =  temp->next;
        delete temp;
    }
    size--;
}

int LinkedList::find(eleType value){
    ListNode *curr = head;
    int index = 0;
    while(curr != NULL && curr->data != value){
        curr = curr->next;
        index++;
    }
    return index;
}

// ListNode* LinkedList::find(eleType value){
//     ListNode *curr = head;
//     while(curr != NULL && curr->data != value){
//         curr = curr->next;
//     }
//     return curr;
// }

ListNode* LinkedList::get(int i){
    if(i<0 || i>=size){
        throw std::out_of_range("Invalid position");
    }
    ListNode* curr = head;
    for(int j = 0;j < i ; j++){
        curr= curr->next;
    }
    return curr;
}

void LinkedList::update(int i,eleType value){
    if(i<0 || i>=size){
        throw std::out_of_range("Invalid position");
    }
    ListNode* node = get(i);
    get(i)->data=value;
}

void LinkedList::print(){
    ListNode* curr = head;
    while(curr != NULL){
        std::cout << curr->data << " ";
        curr = curr->next;
    }
    std::cout << std::endl;
}

int main(){
    LinkedList list;
    list.insert(0,10);
    list.insert(1,20);
    list.insert(2,30);
    list.insert(3,40);
    list.insert(4,50);
    list.insert(5,60);
    list.insert(6,11);       //不能直接插入list.insert(7,11);跨序插入，因为会出现   Segmentation fault   越界错误
    
    std::cout<< "Initial list";
    list.print();

    std::cout << "Removing the second node: ";
    list.remove(1);
    list.print();

    cout<<"Updating the third node to 66"<< endl;
    list.update(2,66);
    list.print();

    cout<<"Finding the value of the fourth node:"<< list.find(10) <<endl;;

    cout<<"Getting the third node :"<<list.get(2)->data << endl;
    
    return 0;

}
