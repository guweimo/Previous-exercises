

def sequential_search(alist, item):
    pos = 0
    found = False
    while pos < len(alist) and not found:
        if alist[pos] == item:
            found = True
        else:
            pos += 1
    return found


if __name__ == '__main__':
    test_list = [1, 2, 5, 6, 2, 55, 23, 53]
    print sequential_search(test_list, 5)
    print sequential_search(test_list, 55)
