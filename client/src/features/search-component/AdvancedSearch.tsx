import React from 'react';

function AdvancedSearch() {
    return (
        <>
            <div className="header__search--widget d-none d-lg-block">
                <form className="d-flex header__search--form" action="#">
                    <div className="header__select--categories select">
                        <select className="header__select--inner">
                            <option selected>All Categories</option>
                            <option value="2">Accessories</option>
                            <option value="3">Accessories &amp; More</option>
                            <option value="4">Camera &amp; Video</option>
                            <option value="5">Butters &amp; Eggs</option>
                        </select>
                        <svg className="header__select--categories__icon" xmlns="http://www.w3.org/2000/svg" width="20"
                             height="10" viewBox="0 0 20 10">
                            <g id="Group_334" data-name="Group 334" transform="translate(-436 -90)">
                                <rect id="Rectangle_128" data-name="Rectangle 128" width="20" height="2" rx="1"
                                      transform="translate(436 90)" fill="currentColor"></rect>
                                <rect id="Rectangle_130" data-name="Rectangle 130" width="20" height="2" rx="1"
                                      transform="translate(436 98)" fill="currentColor"></rect>
                                <rect id="Rectangle_129" data-name="Rectangle 129" width="12" height="2" rx="1"
                                      transform="translate(440 94)" fill="currentColor"></rect>
                            </g>
                        </svg>

                    </div>
                    <div className="header__search--box">
                        <label>
                            <input className="header__search--input" placeholder="Search Products Here..." type="text"/>
                        </label>
                        <button className="header__search--button bg__secondary text-white" aria-label="search button"
                                type="submit">
                            <svg className="header__search--button__svg" xmlns="http://www.w3.org/2000/svg"
                                 width="27.51" height="26.443" viewBox="0 0 512 512">
                                <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                      fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path>
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                      stroke-width="32" d="M338.29 338.29L448 448"></path>
                            </svg>
                        </button>

                    </div>
                </form>

            </div>

        </>
    );
}

export default AdvancedSearch;