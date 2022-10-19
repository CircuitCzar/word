import React, { useState } from 'react';
import mammoth from '../../Utils/mammoth.browser';
import style from './style.scss';
import { UploadIcon } from '../../Asset/icons';
const Home = () => {
    /**
     * 文档
     */
    const [docs, setDocs] = useState<string[]>([]);
    /**
     * 分页
     * @param txt 文档内容
     */
    const handlePage = (txt) => {
        const pattern = /<p.*?><\/p>/g;
        const c = txt.match(pattern);
        const container = document.querySelector('.home_content2');
        // 文档高度
        const height = 998;
        let start = 0;
        let end = 40;
        let arr = c.slice(start, end);
        const page: string[] = [];
        if (container) {
            container.innerHTML = arr.join('');
            while (start < c.length) {
                arr = c.slice(start, end);
                container.innerHTML = arr.join('');
                while (container.clientHeight > height) {
                    end = end - 1;
                    arr = c.slice(start, end);
                    container.innerHTML = arr.join('');
                }
                start = end;
                end = end + 40;
                page.push(arr.join(''));
            }
            setDocs(page);
        }
    };

    /**
     * 上传文件
     */
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const res = await mammoth.convertToHtml({ arrayBuffer: file });
        handlePage(res.value);
    };
    return (
        <div className={style.home_c}>
            <div className={style.home_container}>
                {docs.length === 0 && (
                    <div className={style.home_uploadFile}>
                        <UploadIcon />
                        <span>上传文件</span>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                )}

                {docs.map((item, index) => (
                    <div key={index} className={style.home_content}>
                        <div dangerouslySetInnerHTML={{ __html: item }}></div>
                    </div>
                ))}
            </div>

            <div className={style.home_content2}></div>
        </div>
    );
};
export default Home;
