export const createElement = ({
                                  tag = 'div',
                                  className,
                                  innerText,
                                  url,
                                  alt = '',
                                  id,
                                  type
                              }) => {
    const $tag = document.createElement(tag);

    if (typeof className === 'string') {
        $tag.classList.add(className);
    }

    if (Array.isArray(className)) {
        className.forEach(item => $tag.classList.add(item));
    }

    if (innerText) {
        $tag.innerText = innerText;
    }

    if (tag === 'img') {
        $tag.setAttribute('src', url);
        $tag.setAttribute('alt', alt);
    }

    if (id) {
        $tag.setAttribute('id', id);
    }

    if (type) {
        $tag.setAttribute('type', type);
    }

    return $tag;
};



export const createRowList = (items) => {
    const $list = createElement({tag: 'ul', className: 'list-first'});
    items.forEach(item => {
        const $listElement = createElement({tag: 'li', className: 'list-element'});
        const $title = createElement({tag: 'span', className: 'list-left', innerText: item.title});
        const $desc = createElement({tag: 'span', className: 'list-right', innerText: item.desc});

        $listElement.appendChild($title);
        $listElement.appendChild($desc);

        $list.appendChild($listElement);
    });

    return $list;
}

export const createGridElement = ({
                                      title,
                                      type,
                                      weight,
                                      flavor,
                                      price,
                                      picture,
                                  }) => {
    const $gridElement = createElement({className: 'grid-element'});
    const $image = createElement({tag: 'img', url: picture, alt: 'пикча'});
    const $title = createElement({tag: 'h3', className: 'h3-grid', innerText: `${title} ${type} ${weight} г.`});
    const $catalogListContainer = createElement({className: 'catalog-list'});
    const $button = createElement({
        tag: 'button',
        className: ['catalog-grid-button', 'hover-hover'],
        innerText: 'заказать'
    });
    const $list = createRowList([{
        title: 'Масса',
        desc: `${weight} г.`,
    }, {
        title: 'Вкус',
        desc: flavor,
    }, {
        title: 'Цена',
        desc: `${price} Р.`
    }]);

    $catalogListContainer.appendChild($list);
    $gridElement.appendChild($image);
    $gridElement.appendChild($title);
    $gridElement.appendChild($catalogListContainer);
    $gridElement.appendChild($button);

    return $gridElement;
}

export const setAddsRow = ({name, count, price}) => {
    const $smallGrid = createElement({className: 'small-grid-element'});
    $smallGrid.appendChild(createElement({className: 'grid-name', innerText: name}));
    $smallGrid.appendChild(createElement({className: 'grid-amount', innerText: count}));
    $smallGrid.appendChild(createElement({className: 'grid-price', innerText: price}));

    const $button = createElement({
        tag: 'button',
        className: ['button-order', 'hover-hover'],
        innerText: 'заказать'
    });
    const $buttonWrap = createElement({className: 'grid-button-container'});
    $buttonWrap.appendChild($button);

    $smallGrid.appendChild($buttonWrap);

    return $smallGrid;
};

export const createUpdateElement = () => {
    const $updateButton = createElement({
        className: 'grid-element-last'
    });

    $updateButton.appendChild(createElement({
        tag: 'img',
        className: 'img-catalog-plus',
        alt: 'plus',
        url: './img/plus.svg'
    }));
    $updateButton.appendChild(createElement({
        tag: 'h3',
        className: ['h3-grid', 'mt-0'],
        innerText: 'Показать еще 100500 товаров'
    }));
    $updateButton.appendChild(createElement({
        className: 'text-loading',
        innerText: 'На самом деле вкусов гораздо больше!'
    }));
    const $but = createElement({
        tag: 'button',
        className: ['catalog-grid-button', 'last-button', 'hover-hover'],
        id: 'catalog-grid-button'
    });

    const $butText = createElement({
        className: 'ww',
        innerText: 'Показать всё'
    })

    $but.appendChild($butText);
    $updateButton.appendChild($but);

    return $updateButton;
}

export async function itemsCount() {
    let totalCount = 0;
    await fetch (`http://localhost:3000/catalog?_page=1`).then(res => {
        totalCount = res.headers.get('X-total-Count');
    });

    return totalCount;

}

export class Loader {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.containerElement = createElement({className: 'container-loader'})
    }

    createElement = () => {
        const $loader = createElement({className: 'loader'});
        //const $container = createElement({className: this.containerElement});
        const $container = this.containerElement;
        $container.appendChild($loader);
        this.parentElement.appendChild($container);
    }

    deleteElement = () => {
        this.containerElement.remove();
    }
}


export const matchQuery = (query = {}) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(query).forEach((item) => {
        const key = item[0];
        const value = item[1];
        const isKeyQuery = searchParams.get(key);

        if(isKeyQuery !== null) {
            searchParams.set(key, value.toString());
        }


        console.log('222>>>>' + searchParams.toString())
        return searchParams.toString();

    })
}