import { ready } from 'https://lsong.org/scripts/dom.js';
import { bind } from 'https://lsong.org/scripts/form.js';
import { stringify } from 'https://lsong.org/scripts/query.js';
import { createElement as h, render, useEffect, useState } from 'https://lsong.org/tinyact/src/index.js';

const TranslatorResult = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    bind('#fanyi', {
      onSubmit(e) {
        const form = e.target;
        const data = form.serialize();
        const qs = stringify(data);
        fetch(`${form.action}?${qs}`).then(res => res.json()).then(setResult);
      }
    })
  }, []);
  console.log(result);
  const { basic, translation, web } = result || {};
  return h("div", { className: "translator-result" },
    basic && h("div", { className: "translator-result-basic" },
      h("h3", null, "basic"),
      h("ul", { className: "translator-result-basic-phonetic" },
        basic['phonetic'] && h("li", null, "phonetic: ", basic['phonetic']),
        basic['us-phonetic'] && h("li", null, "phonetic-us:", basic['us-phonetic']),
        basic['uk-phonetic'] && h("li", null, "phonetic-uk: ", basic['uk-phonetic'])
      )
    ),
    translation && h("section", null,
      h("h3", null, "translation"),
      h("ul", { className: "translator-result-translation" },
        translation.map(trans => h("li", null, trans))
      )
    ),
    basic && basic.explains && h("section", null,
      h("h3", null, "explains"),
      h("ul", { className: "translator-result-basic-explains" },
        basic.explains.map(explain => h("li", null, explain))
      )
    ),
    web && h("section", null,
      h("h3", null, "web"),
      h("ul", { className: "translator-result-basic-web" },
        web.map(({ key, value }) => h("li", null,
          h("span", null, key),
          h("ol", null, value.map(x => h("li", null, x)))
        ))
      )
    )
  );
};


ready(() => {
  const app = document.getElementById('app');
  render(h(TranslatorResult), app);
});