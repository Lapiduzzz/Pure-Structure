
const setViewPort = ()=>{
    let height = window.innerHeight
    let width = window.innerWidth
    let viewport = document.querySelector('meta[name=viewport]')
    viewport.setAttribute("content", "height=" + height + "px, width=" + width + "px, initial-scale=1.0");
}

/*                  nav trigger               */

const navTrigger = () =>{
    let trigger = document.querySelector('.nav_trigger')
    let close = document.querySelector('.close')
    let navigation = document.querySelector('.nav')
    let underlay = document.querySelector('.underlay')


    trigger.addEventListener('click', () => {
        trigger.style = 'visibility: hidden;'
        navigation.style = 'transform: translate(0%);'
        underlay.style = 'opacity: 0.6; z-index: 900;'
    })
    close.addEventListener('click', () => {
        trigger.style = 'visibility: visible;'
        navigation.style = 'transform: translate(-101%);'
        underlay.style = 'opacity: 0; z-index: 0;'
    })

}

/*                  slider                  */

const setSliderItem = (sliderWrapper, name, slideAmount, slideNum) =>{

    let prev = slideNum === 1 ? slideAmount : slideNum - 1
    let itemPrev = sliderWrapper.querySelector(`${name}${prev}`)
    let item = sliderWrapper.querySelector(`${name}${slideNum}`)

    item.style = 'opacity: 1'
    itemPrev.style = 'opacity: 0'

}
const setSliderDot = (sliderWrapper, name, slideAmount, slideNum) =>{

    let prev = slideNum === 1 ? slideAmount : slideNum - 1
    let dot = sliderWrapper.querySelector(`.dot_${slideNum}`)
    let dotPrev = sliderWrapper.querySelector(`.dot_${prev}`)

    dot.classList.add('dot_active')
    dotPrev.classList.remove('dot_active')

}
const slider = (sliderWrapper, name, slideAmount, speed, dotMode, autoPlay, autoPlayOff) => {

    let wrapper = document.querySelector(`${sliderWrapper}`)

    let slideItem = 2

    const slideMover = () =>{
        if(slideItem <= slideAmount){
            setSliderItem(wrapper, name, slideAmount, slideItem)
            dotMode && setSliderDot(wrapper, name, slideAmount, slideItem)
            slideItem ++
        }
        else {
            slideItem = 1
            setSliderItem(wrapper, name, slideAmount, slideItem)
            dotMode && setSliderDot(wrapper, name, slideAmount, slideItem)
            slideItem ++
        }
    }

    let intervalID = autoPlay && setInterval(()=> slideMover(), speed)

    autoPlayOff && wrapper.addEventListener('click', ()=>{
        clearInterval(intervalID)
        slideMover()
    })

}

/*                  sticky image               */

const scrollToIntro = () =>{
    let readMore = document.querySelector('.read_more')
    let introOffset = window.innerHeight - 15

    readMore.addEventListener('click', () =>{window.scrollTo({
        top: introOffset,
        behavior: "smooth"
    })})
}

/*                  sticky image               */

const sticky = () =>{

    let image = document.querySelector('.gif_container')
    let contentBlock = document.querySelector('.description_left')
    let intro = document.querySelector('.content_page_introduction').offsetHeight
    let project = document.querySelector('.content_page_project').offsetHeight

    let windowSize = window.innerHeight - 135
    let imageOffsetTop = image.offsetTop + windowSize + (intro + project + 160*2)
    let contentBlockOffsetTop = contentBlock.offsetTop + contentBlock.offsetHeight + windowSize - image.offsetHeight

    let stuck = () =>{
        if (window.scrollY <= imageOffsetTop) {
            image.style = 'position: absolute; top: 120px; bottom: auto;'
        }
        if (window.scrollY >= imageOffsetTop) {
            image.style = 'position: fixed; top: 120px;'
        }
        if(window.scrollY >= contentBlockOffsetTop){
            image.style = 'position: absolute; top: auto; bottom: 0;'
        }

    }

    window.addEventListener('scroll', ()=> window.innerHeight < window.innerWidth ? stuck() : null)
}

/*                  drop elements              */

const dropElement = () =>{
    let dropItem = document.querySelectorAll('.drop_item')

    dropItem.forEach(el=>{
        let header = el.querySelector('.drop_item_header')
        let hide = true

        header.addEventListener('click', ()=>{
            if (hide === true) {
                let arrow = el.querySelector('.svg_replaced')
                let contentBlock = el.querySelector('.drop_item_content')
                let slider = el.querySelector('.project_slider_wrapper')
                    ? el.querySelector('.project_slider_wrapper')
                    : null

                contentBlock.style = 'display: flex'
                slider ? slider.style = 'display: block' : null
                arrow.style = 'transform: scale(1,-1);'
                el.style = `height: ${el.offsetHeight + contentBlock.offsetHeight + (slider ? slider.offsetHeight : 0 )}px`

                return hide = false
            }
            if (hide === false) {
                let arrow = el.querySelector('.svg_replaced')
                let contentBlock = el.querySelector('.drop_item_content')
                let slider = el.querySelector('.project_slider_wrapper')
                    ? el.querySelector('.project_slider_wrapper')
                    : null
                contentBlock.style = 'display: none'
                slider ? slider.style = 'display: none' : null
                arrow.style = 'transform: scale(1, 1);'
                el.style = 'height: 8vh'

                return hide = true
            }
        })
    })
}


window.addEventListener("load", ()=> {
    let loader = document.querySelector('.loader')
    loader.style =  'animation: fadeOut 0.6s ease-in-out;'
    setTimeout(()=>loader.remove(), 600)
    navTrigger()
    setViewPort()
})

const indexScript = () =>{
    scrollToIntro()
    sticky()
    slider('.slider_wrapper','.ls',6, 5000,false, true, false)
/*
    window.addEventListener("load", ()=> {
        sticky()
    })
*/
}
const lanternScript = () =>{
    dropElement()
    slider('.project_slider_wrapper','.lantern',3, 10000,true, true, true)
    slider('.project_slider_wrapper2','.location',4, 5000,true, true, true)
}

/*                  animation                  */

const animation = (selector, animation, second) =>{
    let isAnimated = document.querySelector(`${selector}`)

    document.addEventListener('scroll', ()=>{
        let windowTop = window.scrollY
        if (windowTop >= isAnimated.offsetTop){
            isAnimated.style = `animation: ${animation} ${second}s ease-in-out;`
        }
    })
}

if (document.location.href.endsWith('/') || document.location.href.endsWith('index.html')) {
    animation('.content_page_project', 'fadeIn', 0.6)
    animation('.content_page_introduction', 'fadeIn', 0.6)
    animation('.content_page_description', 'fadeIn', 0.6)
    animation('.content_page_philosophy', 'fadeIn', 0.6)
}
