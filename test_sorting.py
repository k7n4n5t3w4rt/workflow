import pytest
from continue_tutorial import sorting_algorithm, sorting_algorithm2

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_sort_unsorted_list(func):
    assert func([3, 1, 2]) == [1, 2, 3]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_sort_sorted_list(func):
    assert func([1, 2, 3]) == [1, 2, 3]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_sort_reverse_sorted_list(func):
    assert func([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_sort_duplicates(func):
    assert func([3, 1, 2, 2, 3]) == [1, 2, 2, 3, 3]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_empty_list(func):
    assert func([]) == []

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_single_element(func):
    assert func([42]) == [42]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_float_elements(func):
    assert func([3.5, 1.1, 2.2]) == [1.1, 2.2, 3.5]

@pytest.mark.parametrize("func", [sorting_algorithm, sorting_algorithm2])
def test_invalid_input(func):
    with pytest.raises(AssertionError):
        func('not a list')
    with pytest.raises(AssertionError):
        func([1, 'two', 3])
