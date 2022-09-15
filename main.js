import {createElement, createGridElement, setAddsRow, createUpdateElement,itemsCount, Loader} from "./utils";
const $layoutCatalog = document.getElementById('layout-catalog');
const $titleElement = document.getElementById('flex-title');
let totalCount = 0;
const itemsOnPage = 4;

const host = 'http://localhost:3000/catalog';


function del() {
  let params = window.location.search;
  console.log(params)

  if (!params.includes('_page')) {
    window.location.search = `?_page=1`
  }

  console.log(params)

}

async function getCatalog(query = {}) {
  //del()

  let params = window.location.search;


  const searchParams = new URLSearchParams(params);


  if (document.querySelector('.grid-catalog')) {
    document.querySelector('.grid-catalog').remove();
  }
  const $gridCatalog = createElement({className: 'grid-catalog'});
  // const $layoutCatalog = document.getElementById('layout-catalog');
  const $loader = new Loader($layoutCatalog);
  $loader.createElement();
  const data = await fetch(`http://localhost:3000/catalog?${query}`).then(res => res.json());
  $loader.deleteElement();

  //const stringParams = searchParams.toString() ? `?${searchParams.toString()}` : '';

  $layoutCatalog.appendChild($gridCatalog);

  // for (let i = 0; i <= data.length; i++) {
  //   $gridCatalog.appendChild(createGridElement(data[i]));
  // }

  console.log(data);
  for (let item of data) {
    $gridCatalog.appendChild(createGridElement(item));
  }

  return data;
}

async function init() {


  const catalogCountInfo = await itemsCount();
  const catalogPagesMax = Math.ceil(catalogCountInfo / itemsOnPage);
  console.log(catalogCountInfo);
  console.log(catalogPagesMax);

  async function createPaginationElement (maxPage, items, url)  {

    const $pagesContainer = createElement({className: 'pages-container'});

    for(let i = 1; i <= maxPage; i++) {
      const $page = createElement({tag:'button', innerText: i, type: 'button'});
      $pagesContainer.appendChild($page);
      $page.addEventListener('click', async () => {
        await getCatalog(`_page=${i}&_limit=${itemsOnPage}`);
        let params = new URLSearchParams(window.location.search);
        params.delete('_page');
        console.log(">>" + window.location.search)
        params.set('_kek', i.toString());

        // window.location.search = params.toString();

      })
    }


    $titleElement.appendChild($pagesContainer);
  }

  await createPaginationElement(catalogPagesMax)

  const $table = document.getElementById('table');

  //const $gridCatalog = createElement({className: 'grid-catalog'});


  let catalog = {};

  await getCatalog('?_page=1&_limit=4');
  const dataAds = await fetch('http://localhost:3000/adds').then(res => res.json());

  catalog = {
    adds: dataAds,
  }

  // const $updateButton = createUpdateElement();

  for (const item of catalog.adds) {
    $table.appendChild(setAddsRow(item));
  }

// if(catalog.data) {
//
//
// }

// const $buttonUpdate = document.getElementById('catalog-grid-button');



// $buttonUpdate.addEventListener('click', function () {
//   for (let i = 3; i < catalog.data.length; i++) {
//     $gridCatalog.appendChild(createGridElement(catalog.data[i]));
//     $gridCatalog.appendChild($updateButton);
//     $updateButton.remove();
//   }
// })


}

await init();