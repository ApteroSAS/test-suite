module.exports = {
    before: function (browser) {
        //Declaring Global Timeout
        browser.globals.waitForConditionTimeout = 7000
    },

    'Teleport Test':  async function (browser) {
        browser
            browser.url('https://alphahub.aptero.co/hub.html?hub_id=Asf3PJQ&vr_entry_type=2d_now&test=true')
            browser.waitForElementVisible('body', 10*60*1000)
            browser.openNewWindow(function(result) {
              })
              
            browser.windowHandles( async function (result) {
                var handle = result.value[1];
                var clicked=false;
                browser.switchWindow(handle)
                browser.url('https://localhost:8080/hub.html?hub_id=Asf3PJQ&vr_entry_type=2d_now&test=true')
                browser.useCss()
                // wait for the body to be uploaded 
                browser.waitForElementVisible('body', 10*60*1000)
                //wait for the people button to be uploaded
                browser.waitForElementVisible("#ui-root > div > div > div.RoomLayout__main__5RZRe.RoomLayout__viewport__2n3eu > div.ContentMenu__content-menu__q3MW9 > button:nth-child(3)", 10*60*1000)
                browser.click("#ui-root > div > div > div.RoomLayout__main__5RZRe.RoomLayout__viewport__2n3eu > div.ContentMenu__content-menu__q3MW9 > button:nth-child(3)")
            
        
            await browser.getAttribute('#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(1) > button > p:nth-child(3)', 'textContent', function(result){
                    if(!result.value.includes("You")){
                        clicked=true;
                        browser.waitForElementVisible("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(1) > button", 10*60*1000)
                        browser.click("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(1) > button")   
                        browser.waitForElementVisible("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > div > button:nth-child(3)", 10*60*1000)
                        browser.click("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > div > button:nth-child(3)")
                    }
                    
                })
                if(!clicked)
                {
                   browser.getAttribute('#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(2) > button > p:nth-child(3)', 'textContent', function(result){
                       if(result!=null){
                        if(!result.value.includes("You")){
                            browser.waitForElementVisible("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(2) > button", 10*60*1000)
                            browser.click("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > ul > li:nth-child(2) > button")
                            browser.waitForElementVisible("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > div > button:nth-child(3)", 10*60*1000)
                            browser.click("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > div > button:nth-child(3)")
                      
                        }}
    
                    })
                    browser.pause(7000)
                } 
            })
            //go to the first tab
            browser.windowHandles(function (result) {
                var handle = result.value[0];
                browser.switchWindow(handle)
                browser.url('https://alphahub.aptero.co/hub.html?hub_id=Asf3PJQ&vr_entry_type=2d_now&test=true#a')
                browser.pause(7000)
            })
            //go to the second tab
            browser.windowHandles(function (result) {
                var handle = result.value[1];
                browser.switchWindow(handle)
                browser.url('https://localhost:8080/hub.html?hub_id=Asf3PJQ&vr_entry_type=2d_now&test=true#b')
                browser.click("#ui-root > div.ui-root__ui__3D1Np.ui-root.in-modal-or-overlay > div > div.RoomLayout__sidebar__kXGbN > div > div.Sidebar__content__9PSSu.Sidebar__overflow-y__3hrc3 > div > button:nth-child(3)")
                console.log("second child clicked for the second time")
                browser.pause(7000) 
            })
    },   
}
