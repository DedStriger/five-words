import Cell from 'components/Cell';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div>
      <div className={styles.header__line}>
        <Cell cellPos={0} linePos={1} isWinningLine value='5' />
        <Cell cellPos={1} linePos={1} isWinningLine value='б' />
        <Cell cellPos={2} linePos={1} isWinningLine value='у' />
        <Cell cellPos={3} linePos={1} isWinningLine value='к' />
        <Cell cellPos={4} linePos={1} isWinningLine value='в' />
      </div>
    </div>
  );
};

export default Header;
