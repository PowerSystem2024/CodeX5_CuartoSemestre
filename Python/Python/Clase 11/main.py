import store
def run():
    store.get_data('https://dog.ceo/api/breeds/list/all')

if __name__ == '__main__':
    run()