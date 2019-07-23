import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  render () {
    return (
      <div className={css('footer-wrap', { 'is-splash': this.props.page === '/history', 'is-balk': this.props.page !== '/history' })}>
        <div className='footer-inner'>
          <div className='footer-nav'>
            <div className='footer-nav--socials'>
              <div className='footer-nav--socials-item'>
                <a className='footer-nav--socials-link' target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/fields.music/'>
                  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM18.7233 11.2773C20.0886 11.2152 20.5249 11.2 24.0012 11.2H23.9972C27.4746 11.2 27.9092 11.2152 29.2746 11.2773C30.6373 11.3397 31.5679 11.5555 32.384 11.872C33.2266 12.1987 33.9386 12.636 34.6506 13.348C35.3627 14.0595 35.8 14.7736 36.128 15.6155C36.4427 16.4294 36.6587 17.3595 36.7227 18.7222C36.784 20.0876 36.8 20.5238 36.8 24.0001C36.8 27.4764 36.784 27.9116 36.7227 29.277C36.6587 30.6391 36.4427 31.5695 36.128 32.3837C35.8 33.2253 35.3627 33.9394 34.6506 34.6509C33.9394 35.3629 33.2264 35.8013 32.3848 36.1283C31.5703 36.4448 30.6391 36.6605 29.2765 36.7229C27.9111 36.7851 27.4762 36.8003 23.9996 36.8003C20.5236 36.8003 20.0876 36.7851 18.7222 36.7229C17.3598 36.6605 16.4294 36.4448 15.615 36.1283C14.7736 35.8013 14.0595 35.3629 13.3483 34.6509C12.6365 33.9394 12.1992 33.2253 11.872 32.3834C11.5557 31.5695 11.34 30.6394 11.2773 29.2767C11.2155 27.9114 11.2 27.4764 11.2 24.0001C11.2 20.5238 11.216 20.0873 11.2771 18.7219C11.3384 17.3598 11.5544 16.4294 11.8717 15.6152C12.1997 14.7736 12.6371 14.0595 13.3491 13.348C14.0606 12.6363 14.7747 12.1989 15.6166 11.872C16.4305 11.5555 17.3606 11.3397 18.7233 11.2773Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.853 13.5066C23.0759 13.5063 23.3158 13.5064 23.5746 13.5065L24.0013 13.5066C27.4189 13.5066 27.824 13.5189 29.1736 13.5802C30.4216 13.6373 31.0989 13.8458 31.5501 14.021C32.1475 14.253 32.5733 14.5304 33.0211 14.9784C33.4691 15.4264 33.7464 15.853 33.979 16.4504C34.1542 16.9011 34.363 17.5784 34.4198 18.8264C34.4811 20.1758 34.4944 20.5811 34.4944 23.9971C34.4944 27.4132 34.4811 27.8185 34.4198 29.1678C34.3627 30.4159 34.1542 31.0932 33.979 31.5439C33.747 32.1412 33.4691 32.5665 33.0211 33.0143C32.5731 33.4623 32.1477 33.7396 31.5501 33.9716C31.0995 34.1476 30.4216 34.3556 29.1736 34.4127C27.8242 34.474 27.4189 34.4874 24.0013 34.4874C20.5834 34.4874 20.1783 34.474 18.8289 34.4127C17.5809 34.3551 16.9036 34.1466 16.4521 33.9714C15.8548 33.7394 15.4281 33.462 14.9801 33.014C14.5321 32.566 14.2548 32.1404 14.0222 31.5428C13.847 31.0921 13.6382 30.4148 13.5814 29.1668C13.5201 27.8174 13.5078 27.4121 13.5078 23.9939C13.5078 20.5758 13.5201 20.1726 13.5814 18.8232C13.6385 17.5752 13.847 16.8979 14.0222 16.4466C14.2542 15.8493 14.5321 15.4226 14.9801 14.9746C15.4281 14.5266 15.8548 14.2493 16.4521 14.0168C16.9033 13.8408 17.5809 13.6328 18.8289 13.5754C20.0097 13.5221 20.4674 13.5061 22.853 13.5034V13.5066ZM30.8339 15.632C29.9859 15.632 29.2978 16.3192 29.2978 17.1675C29.2978 18.0155 29.9859 18.7035 30.8339 18.7035C31.6819 18.7035 32.3699 18.0155 32.3699 17.1675C32.3699 16.3194 31.6819 15.6314 30.8339 15.6314V15.632ZM17.4279 24.0001C17.4279 20.37 20.3709 17.4268 24.001 17.4267C27.6312 17.4267 30.5736 20.3699 30.5736 24.0001C30.5736 27.6302 27.6314 30.5721 24.0013 30.5721C20.3711 30.5721 17.4279 27.6302 17.4279 24.0001Z" fill="white"/>
                    <path d="M24.0011 19.7334C26.3574 19.7334 28.2678 21.6436 28.2678 24.0001C28.2678 26.3564 26.3574 28.2668 24.0011 28.2668C21.6445 28.2668 19.7344 26.3564 19.7344 24.0001C19.7344 21.6436 21.6445 19.7334 24.0011 19.7334Z" fill="white"/>
                  </svg>
                </a>
              </div>
              <div className='footer-nav--socials-item'>
                <a className='footer-nav--socials-link' target='_blank' rel="noopener noreferrer" href='https://www.facebook.com/events/2321291901531623/'>
                  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48 24C48 10.7438 37.2562 0 24 0C10.7438 0 0 10.7438 0 24C0 35.9813 8.775 45.9094 20.25 47.7094V30.9375H14.1562V24H20.25V18.7125C20.25 12.6984 23.8313 9.375 29.3156 9.375C31.9406 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6594C28.6781 15.75 27.75 17.6016 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7094C39.225 45.9094 48 35.9813 48 24Z" fill="white"/>
                  </svg>
                </a>
              </div>
              <div className='footer-nav--socials-item'>
                <a className='footer-nav--socials-link' target='_blank' rel="noopener noreferrer" href='https://vk.com/fields_mutabor'>
                  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM25.9541 31.5762C25.7175 31.8257 25.2555 31.8761 25.2555 31.8761H23.7254C23.7254 31.8761 20.3497 32.0752 17.376 29.037C14.1331 25.7222 11.2695 19.1455 11.2695 19.1455C11.2695 19.1455 11.1043 18.7141 11.2833 18.5064C11.4849 18.2717 12.0346 18.2569 12.0346 18.2569L15.6919 18.2336C15.6919 18.2336 16.0363 18.2889 16.2829 18.4671C16.487 18.6146 16.601 18.8887 16.601 18.8887C16.601 18.8887 17.192 20.3562 17.9745 21.6835C19.5033 24.2756 20.2145 24.8422 20.7329 24.5644C21.4892 24.1601 21.2625 20.9006 21.2625 20.9006C21.2625 20.9006 21.2763 19.7183 20.8819 19.191C20.5764 18.783 20.0004 18.6637 19.7462 18.6306C19.5396 18.6035 19.8777 18.134 20.3159 17.9239C20.9745 17.608 22.1365 17.5896 23.51 17.6031C24.5806 17.6141 24.8886 17.6793 25.3068 17.7788C26.2774 18.0087 26.2471 18.7455 26.1817 20.3357C26.1621 20.8113 26.1394 21.3631 26.1394 22.0006C26.1394 22.1439 26.1352 22.2966 26.1308 22.4537C26.1081 23.2683 26.0821 24.2012 26.629 24.5485C26.9095 24.7254 27.5944 24.5743 29.3085 21.7179C30.1211 20.3635 30.7296 18.7719 30.7296 18.7719C30.7296 18.7719 30.8636 18.488 31.0702 18.3663C31.2818 18.2422 31.5673 18.2803 31.5673 18.2803L35.4162 18.2569C35.4162 18.2569 36.5732 18.1205 36.7597 18.6343C36.9563 19.1713 36.3278 20.4274 34.7551 22.4849C33.2633 24.4371 32.5374 25.1558 32.604 25.7915C32.6527 26.256 33.1246 26.6761 34.0302 27.5006C35.9205 29.2235 36.4273 30.1299 36.549 30.3477C36.5591 30.3657 36.5665 30.379 36.5719 30.3877C37.4196 31.7679 35.6316 31.8761 35.6316 31.8761L32.2121 31.9228C32.2121 31.9228 31.4784 32.0654 30.5118 31.414C30.0054 31.073 29.5106 30.5162 29.0394 29.9858C28.3196 29.1758 27.6548 28.4276 27.0873 28.6043C26.1344 28.9018 26.1632 30.9162 26.1632 30.9162C26.1632 30.9162 26.1707 31.3476 25.9541 31.5762Z" fill="white"/>
                  </svg>
                </a>
              </div>
              <div className='footer-nav--socials-item'>
                <a className='footer-nav--socials-link' target='_blank' rel="noopener noreferrer" href='https://t.me/fields_music'>
                  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM16.0715 21.8015C13.6673 22.8512 11.1971 23.9298 8.93825 25.174L8.93809 25.1741C7.75861 26.0377 9.32638 26.6485 10.7971 27.2215C11.0309 27.3126 11.2622 27.4027 11.4797 27.4927C11.6607 27.5484 11.8447 27.607 12.0312 27.6664C13.6669 28.1875 15.4907 28.7686 17.0787 27.8945C19.6873 26.396 22.149 24.6636 24.6089 22.9325C25.4148 22.3653 26.2205 21.7983 27.0311 21.2397C27.0691 21.2154 27.1119 21.1876 27.1588 21.1573C27.8493 20.7096 29.4024 19.7029 28.8279 21.0901C27.4695 22.5757 26.0144 23.8907 24.5515 25.213C23.5655 26.1041 22.5759 26.9985 21.6099 27.9505C20.7686 28.6341 19.8949 30.0088 20.837 30.9661C23.0069 32.4851 25.2107 33.9673 27.4132 35.4487C28.1299 35.9307 28.8466 36.4127 29.5618 36.8959C30.774 37.8637 32.6685 37.0808 32.935 35.5685C33.0535 34.8728 33.1725 34.1772 33.2915 33.4815C33.9491 29.6368 34.6069 25.7907 35.188 21.9335C35.267 21.3284 35.3565 20.7234 35.4461 20.1181C35.6632 18.651 35.8806 17.1821 35.9485 15.7071C35.7735 14.2351 33.9887 14.5588 32.9955 14.8898C27.8903 16.8324 22.8361 18.919 17.8019 21.0424C17.2316 21.295 16.6535 21.5474 16.0715 21.8015Z" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className='footer-nav--right'>
              <div className='footer-nav--copyright'>Fields Festival 2019</div>
            </div>
            <div className='footer-nav--left'>
              <div className='footer-nav--link-wrap'><a className='footer-nav--link' href='mailto:vr@fields.agency'>vr@fields.agency</a></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
