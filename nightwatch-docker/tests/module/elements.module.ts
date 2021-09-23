/**
 *
 example const processEl = function processEl(el){return el.components["animation-mixer"]}
 */
export async function execOnElement(browser,id,processEl){
    return new Promise((resolve) => {
        const lib = processEl.toString();
        browser.execute(function (id,lib) {
            const el:any = document.getElementById(id);
            eval(lib);
            const res = processEl(el);
            console.log(res);
            return res;
        }, [id,lib], (result) =>{
            resolve(result.value);
        });
    })
}