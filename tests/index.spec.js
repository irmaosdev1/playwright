import { expect, test } from "playwright/test";

// test ('Visitando o site', async ({page}) => {
//     await page.goto('http://127.0.0.1:5500/index.html');
//     await expect (await page.title()).toBe('Bootstrap falando com uma API');
//     await page.once('load', () => console.log('Page loaded!'));
// })

// test ('Colocando link do CRUD e carregando tabela', async ({page}) => {
//     const input = page.locator('#urlInput');

//     await page.goto('http://127.0.0.1:5500/index.html');
//     await input.fill('https://crudcrud.com/api/f8a1c061747242ddaf9ea6e486b9c3de');
//     await input.blur();
// })

// test ('Adicionando uma pessoa', async ({page}) => {
//     const input = page.locator('#urlInput');

//     await page.goto('http://127.0.0.1:5500/index.html');
//     await input.fill('https://crudcrud.com/api/f8a1c061747242ddaf9ea6e486b9c3de');
//     await page.getByRole('button', {id: 'btnAdd'} ).click();
//     await page.getByLabel('Nome').fill('José Ícaro');
//     await page.getByLabel('E-mail').fill('jose@icaro.com');
//     await page.getByLabel('Cliente').check();
//     await page.getByRole('button', {name: 'Adicionar pessoa'}).click();
// })

// test ('Editando uma pessoa', async ({page}) => {
//     const input = page.locator('#urlInput');

//     await page.goto('http://127.0.0.1:5500/index.html');
//     await input.fill('https://crudcrud.com/api/f8a1c061747242ddaf9ea6e486b9c3de');
//     await input.blur();
//     await page.getByRole('button', {name: 'Editar'}).nth(0).click();
//     await page.getByLabel('Nome').fill('Daniella');
//     await page.getByLabel('E-mail').fill('dani@dev.com.br');
//     await page.getByLabel('Fornecedor').check();
//     await page.getByRole('button', {name: 'Editar pessoa'}).click();
// })

test("Deletando uma pessoa", async ({ page }) => {
  const input = page.locator("#urlInput");


  await page.goto("http://127.0.0.1:5500/index.html");
  await input.fill("https://crudcrud.com/api/1b510c42bbba4bf1b4f43503d6f2eea8");
  await input.blur();
  
  const botaoExcluir = page.getByText("Deletar").nth(0);

  console.log(botaoExcluir);

  await page.pause();
  
  await botaoExcluir.click();
  await page.pause();

  console.log(botaoExcluir);

  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button').click();

//   page.on('dialog', async (d) => {
//     await page.getByRole("button", { name: "Ok" }).click();    
//   })

  await page.pause();
    
});
