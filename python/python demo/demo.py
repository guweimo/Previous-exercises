# coding=utf-8


class Stack():      # 栈
    def __init__(self, size):
        self.size = size
        self.stack = []
        self.top = -1

    def push(self, ele):    # 入栈
        if self.isfull():
            raise exception("out of range")
        else:
            self.stack.append(ele)
            self.top += 1

    def pop(self):          # 出战
        if self.isempty():
            raise exception("stack is empty")
        else:
            self.top -= 1
            return self.stack.pop()

    def isfull(self):
        return self.top + 1 == self.size

    def isempty(self):
        return self.top == -1


class Queue():      # 队列
    def __init__(self, size):
        self.size = size
        self.front = -1
        self.rear = -1
        self.queue = []

    def enqueue(self, ele):     # 入队操作
        if self.isfull():
            raise exception("queue is full")
        else:
            self.queue.append(ele)
            self.rear += 1

    def dequeue(self):          # 出队操作
        if self.isempty():
            raise exception("queue is empty")
        else:
            self.front += 1
            return self.queue[self.front]

    def isfull(self):
        return self.rear - self.front + 1 == self.size

    def isempty(self):
        return self.front == self.rear


if __name__ == '__main__':
    q = Queue(20)
    for i in range(4):
        q.enqueue(i)
    for i in range(len(q.queue)):
        print q.dequeue()
    #print q.dequeue()
    print q.isempty()
