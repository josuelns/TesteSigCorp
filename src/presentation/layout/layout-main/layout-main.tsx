import React from 'react'
import Styles from './layout-main-styles.scss'

type Props = {
  Header: React.FC
  Search: React.FC
  Content: React.FC
  Footer: React.FC
}

export const LayoutMain: React.FC<Props> = ({
  Header,
  Search,
  Content,
  Footer
}: Props) => {
  return (
    <div className={Styles.layoutMainWrap}>
      <header className={Styles.header} >
        <Header />
      </header>
      <div className={Styles.content}>
        <aside className={Styles.content_left}>
          <Search />
        </aside>
        <section className={Styles.content_right}>
          <Content />
        </section>
      </div>
      <footer className={Styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}
