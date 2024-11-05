const API_KEY = "0ee975342889238cf3f1f083798bd8b9";
const BASE_PATH = "https://developers.themoviedb.org/3"

interface IMove {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;

};

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };

    page:number;
    results: IMove[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWU5NzUzNDI4ODkyMzhjZjNmMWYwODM3OThiZDhiOSIsIm5iZiI6MTczMDY4NTYxOC42ODQ1MDYyLCJzdWIiOiI2NzI4Mjg0ODI5NzM1ZDZhMDRkYTgyMDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6txE7lalKwknnEkwMSp95ksz-nLpfj3OvXgwIzx2XH8'
        }
    };

    return fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then(res => res.json());
}