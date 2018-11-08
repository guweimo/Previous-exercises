from random import randint, choice
from operator import add, sub, mul, div, imod

ops = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div
}

def main():
    try:
        n = int(raw_input('Please enter time: '))
    except:
        print 'Please enter an integer instead of a string'
        return 
    num = randint(1, 7)
    op = choice('+-*/')
    s = ops[op](n, num)
    print '%d %s %d = %d h' % (n, op, num, s)


if __name__ == '__main__':
    main()
    raw_input('Please print enter')
