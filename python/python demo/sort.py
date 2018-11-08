# coding=utf-8
# 冒泡排序


def bubble(l):
    print l
    for i in range(len(l) - 1):
        for j in range(i):
            if l[j] > l[j + 1]:
                l[j], l[j + 1] = l[j + 1], l[j]
    print l


# 分而治之排序(合并排序)
def merge(l):
    print l
    if len(l) > 1:
        mid = len(l) // 2
        left_half = l[:mid]
        right_half = l[mid:]
        merge(left_half)
        merge(right_half)
        i = j = k = 0
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                l[k] = left_half[i]
                i += 1
            else:
                l[k] = right_half[j]
                j += 1
            k += 1
        while i < len(left_half):
            l[k] = left_half[i]
            i += 1
            k += 1
        while j < len(right_half):
            l[k] = right_half[j]
            j += 1
            k += 1
    print l


if __name__ == '__main__':
    l = [20, 10, 23, 53, 42, 14]
    merge(l)
