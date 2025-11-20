import React from 'react';
import { Page } from '../types';
import Icon from './common/Icon';
import { icons } from 'lucide-react';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  pages: Page[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const pageIcons: { [key in Page]: keyof typeof icons } = {
    'Dashboard': 'LayoutDashboard',
    'Inventário de Equipamentos': 'Computer',
    'Controle de Licenças': 'ScrollText',
    'Usuários e Permissões': 'Users',
    'Configurações': 'Settings',
    'Auditoria': 'History',
}

const developerPhoto = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAGTCAYAAACVjzOFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHheXP1rzG1Ldh2GjVlVa639+h7n3HMfzW72i01KCiXTEUUJiBLbv5JIJJSYTxkJ8stBAgsBYgQGAiRIrgEJSRxDVgQbUWwYDmAjNhLZsiXRkZLACCApIiWBFKmmyH6IFLtv932fc77Xfqy1qio/xpi11uXuPvd8Z39716qaNZ9jzppl/7P/4U9VA9B1EaVkABVmAGAIZphzQdd1KAVABXIpAICh73G5nBHMEGNECAEww5wzSi2wGFBKwWbY4Hy+IM8zzAALASklTPOMrutgMNRSEENE33eY5xnnM8etqCglI8WEmCJqqYgxIZcZKXXouh65FEzjhJxnlFIQg2G32yLPGRUV4ziiwlArkGJElzoYgHmeUWrBNI0AgFzm9rlagVIqYgyIMSKlhJQiaq04HU8wM6TUAQaEYDADxsuInDNiCKgav6Ki6zqM44QK4HI+Y5ombIYB/TBgzhPGcQQq0KUOpVSEEJBLQSkVj48PqKVgs9ng6uoKXd+jlILj0xMu5zNijIgxIYaAkmdM04iKir4bEFOHcZqQa4VZwGW8oMwz1xQCSq0YpxGlZBgMIRhSTMhzRogR4zhinieUUpFiRAiGEAPGccTxdMYwbND1Pe7v72EwlJIxzxNqKdz3zUY0BiwAZoaSK2opQAVCCDDtcS0VBRW1VlgIqKXCzGBkRFgwoII/GzBNE/8BoFbyY0yJY8OQYiAP14pcCpL2vALIuaDkrD2MgAEGA8wwjaRfnmfElNCl1PYiWESIEaVybrVWBCMtoblz/Iyq9aFWDH3HtQR+p1ag1IoQKDeoQEVFMIMZ5x1DAEWQs86iZ9f1SCkihAqgInUdzCJlMHUIxu/VCsRI+oYYxScRZqRX3/fYbreIMVEmzbDdDOi6BAsB8zwjhIjN0MMABAsIwVABmFGuL5cLSq3o+p4y0iV0XUKXOvR9j1oqcp6RS9FcAkotSDGh6zuklIAKlFKQc8Y0TxgvIyxE7HY7bMU/p/MJIQT0/YAYEwBgnmaMLrc543w+I8aAq8MVUkqYtb/UWwU5z5jmGXPOpEVIyDPXMF7O2O132O62SCkhl4w8Z44BQwDQdanNM6WE7W6HUgr1VAjoRYPT6Yjz+YJaC4JRJmqVzpoLuq6HxYhcOD+DIUtfkgWNPBUj+VSylFLiWnJGyTOS6EB+It+FaNy7nFFRyAQwAIZpmhuvTtOIWqifYYa+6zHnjMvlIh4hD07TBNSKJLmqqIgpkr+lG2slP8x5RhCv8pn8sZQCVPJ+rpwTZQfoUkII1K05Z4QQMPQD+p57xvlTXl/f3eN0OuPly1f4znffw/3TEVOuuHn2Bj7+9CXmCliMmHPBXCpKrZxviKiVczdwHrRh3EdUjh9TBGDIs/YlUC8EM9SaAclt6ij/MOPfMJScgQr0XUIp3I9SAfvX/uWfqUBFDCRMKVxkiBFmhpypuEybRIMbEGNAniYMQ4/LZQQM6Loel2kEJNClFMQYcTlfECK/A1DplEJmKrmg5IL9/oAYAsbxglqpzC0Yzucz+q6HhYDL5YLNZkDJGanrMOeMaZqxHTYcX2sYLxeM4wUWAhVS6jBNs5SwoeTSFCuZHJjzLIWYtAlUBNM0UumBhielBKBinjOyaGXGjUOtUqAFBkPX95rnjJLpmXRdR+WQC0otmOcJBsNm2KDkSsavwDAMuIwXTNNEB8LnZ4ZcCrrUIcRAQyaBI3NLWRU6MQgBuWTuoVEhG4AQImB0alKiIKNWOgcxyrGgQS0lY5pGpJQ0xwmPj0+Y54yu75oCC0Zhh4QdoKMgzkIpxeUFwWjcASBGOi2oVC5mhnnOVCy1oNaKPE/IOSPneeXsUDhdeEIIjbdcCXJNBQY6VgXkrWmacD6fUUrFONHBuTpcYb/fNQHjmJwbHR7+m7R0RQJM44jYJQxuZFKHy/mCaZrRySmDyfhrrK7rJW/kxSgFTZnLSKlDjOTffuiaHPZ9h2Ho5dBRTl0uYYYY6ADUyn1KKSFKeaWU+J1AOfT9hwF919HIBo4XYvDl0agWOj3OE/M8k78QMM1T400DZMy51iylbObPo3JNiTyGUsgjMSDngionr4IORkodcs4Yx5EKy6zxFI2AFDkMvRwBGB1bGuLadBkMMASEEKkDAJRMB7iUDIj3fNxSqxQn5baCa0xdJz5beIwGg0q9S0mOEv+USnmPgToNCkxq5TxzkW4yE0/ToXPj2nc9+r5DnmeUMqNP1CGl0ICYGVKXEGLEpAADKAAC8swxzIB5HJHzLEcSGIYN9ZOCmXme5UgnOtzctBbkwAwWxfdrOc4zHYScEVNCKdRBrv/RHE7yei38cikZeabeKgoYnp4eMY4T8izDHhMqDFdXB1QU3N3d43Qa8Y1v/TZe3T3id77zXdSQ0G+3QIiA9MqcZ8pdXRwQcBWUYb1PXkwIIWCayMewAAuUyTxPsCADGmicY5I81gooGPL9r3Js7X/9r/xCjTFK0RXkPEnR0bOOMWHO8yrSc2+rwirQ9z1O5zPMAqKMjlv1nDN9BfMIRfKP9WIpIH0/yBvKZGwpr3me0fXLQoZhwDQzYqEy56KmaUSMASmSQH3XNYXtz3GlOI4jutQhpoTxckE3dKi1YLyM6PsBZkHfKxinkQpPDJZneqGcONcyDD3nNY2YZ27onPU5CXTfd4gh4Hw+o+s6GvDADZzGkUo4dghmGMcR0zxhu9li2Aw4XxjxzzkjWMR2u0FxTz1F0gqAVTKoBTo2Wd5b6qiMp+kiIzkDALquk+cY8Pj4iO12i5Q6nI4neqGBkUrfkz70ACtSWLzMGJ1vclO8AGBSgqVklEqeCSGg63vUWjFPMxlbTBkU4aEZ9ACDYcozUYCaqawCnRw3etB3c57l1FAwosYtpSCG0BTdWmGUnBmNpsiocBjkQJKe86wIRwac0XdgBK7PAS5JjMy7lBRFBsQoh0Meu9MGUkiwJTKvhc5ZiFQMMdAYhBioICQPCy/T+ePLGm+HSOUSYgKal14VOQQUyZvJeaZcBgQLoJrmeKUujg6gPVFEUyrlrvIJLZKkvl2iKCNUQXlvsk+6VTkUrgtcmQFo6AU/x6esaddk2gzTOKPvBy6xFhlIIQYALhc6TxA/5FJgFUTBhDaQzxmBVTmXHkXSsdIewxSpVVQUVCnVeZ4WHhZf0gjSkQwxce9AdAZan4F7H0JABSMnokUTHQwsjgiRJSClwAhU+51LIc+UQiQk0tH0dRkCSiFyQsOGJscAMGciggAAOXiQIYSer00iPVIUlxCxgZyP1JzxhElOXN9TJ+Z5wna75TOF5pRSAM2TwxfUrMhdzurlfMLj/T0++OADzOMFT8cHjOMFV4cbmHVA6PCf/9VfxD/4h7+Gr/7Ij6DAMM6MzqtQU1PUG0NAAZ2VGLu210E8RznUbCptV5eWwIL6hjziDlit3M8YIvlFNMw5w/7sv/o/qnyzWTzaAguA0UjR0zXk2aM+TqqUgi71DUZwhehKuZqRqWtF3/coYtqUqDTcGELwUood3wsRIQbkOWOaZ0DM0HUdqqAdSGlu+kEQIFBB75fG2RUR16sPcB2ZEZxHj66Yx3HCMAyEguaJEIExorqMjFzdg3SI2uSNB3k8HhlEwUoGw5xnQhxiwn7YUGHJeamVcHYIESkmBAMjVLjhIXMAwDhOFLAVrUsuGIYNrNJpMDMM2w2Ox1Pz1k0M4g6UkQfavp3PZ2w2W5gFPB2PQCX0A3nzjB5ohGupiBYwDD2OxxNSFwX7yvGZJgQzDAMdkll7iEB4znkHtSJnKW0LQC1IikajICaYYbvdyiAqugX5NCrqieKnoAinVspsCDJegLxp8aieF1fGKMZIvoKhU9oBMsBmjPxT6lBlQINRiRrc2FFIU0pAofyY0gKm6JLRxQLzEmpyZUIlxb1ymI2GNSrNEiOjLZOtdHlbsTflOEimqpQGOJ85Z1ymCaUCuVZFPABAJwbGNAQsyBLyGeRFzllqEDFGokAwdInRVM7co5RSi8AAYwTjil4KKWfyohuNhuwoyjE30ILhQnDFTUMxTXSO/f0i5IVkpBEoOWPOhL5rg+AZiRto3AMVhagEjNOIEAJipJ6goQLynAWdeyRKtI0eJHnNIVOXbXfQQ1h4lnA4HdBpnAAZ6znP2m86eaYNDUIhaKSLAh3OCzDkQuePMsV9mfNEx0sOyflyaVAlQHi3FHcMKDucOw0qx6ODbhDEPE0NwqYcae9yQZ4ZeFWlnSDD7XtbSkYK1BF916MKqaHDKA4UDG4AYooYuo7yZIahSyhlwv3dKzw+3uPlJy/xySev8N/+7/xJ/Gd/5a/iz/7v/w/4b/y3/jmMecbxdOa+Bu5riGEJBtfy7AhD9vSnMdrO3OdauFfkN6JnZkR03OmtlWiry7IbVwsR9n9698/UcRwxjhOFV4JaSkHXMYosdfEuqjykWuntbLeEzsYLIeDkUaIzmODktZINioRmTTgkKoi+G3B8eoKBCqrWimmesdluAEFbQ99jnCYqPuUASs40xJprSpGMUsviccqTLDJ8OU+IITKSGyfkvMDgFGZBkJU55iwYwzy/rPxKlEBdLheuYRgI457PbW0ezQU5BxflY4OYNISAy2WEg6Y0doTFY/ScbZb3xOjQ4aacmbfKuWCaaQDHaWJeSMqNTOHCTgcqzxldRwV4Pp/R9wNSShinGVlRdy4UdkIqhmmaYIoGXZHkzIhhHC+oIKToHrTJiSmZtHRaZCmRvusRjIxfayUc2nXK7eamjMys5eyp3wOm8YKuS4AMkZlhGhk55FxxuYykY4qYLppb36HvOmy3W/J6TOi7HgBoGAqdPv8elPaAMTImtE6oMsgho3cMQnHUzYSvapExpeoIIeq7NGI0doYYCXsGc6PpDoKiCD2Hhp0yEQOhUwMdlUE8BwCp61BBuKrvezoRUo7QfEoFClgPIbOLrMhwzkWGMGKeBY9qHnOmcgUo50QquE7yYm586krf5JDMgnlNtHBjzXEU8csZNgNmpR5CjLicZezCsv6iaCEpDeGyW6oiN/0MRYzuqLhCpOFS5ChFK4YDfSbKDvmJkWeKiXNV/s6NQqllUeagYV+eF+RcUFboBIIRkGo6TFA7jaOgcSn+JOcPjtCFuEIefAaM7P15OUu2WwqIBnue5gaz1xUC5cZ0eYbD2szvel0NeZcOCXmaPNjkktRDSus9cUdExrto7YFIjH+XfxMRhHTsNE2oZWbqwyqGPuHmao8YAj58/0N8/vM/iP/jv/nn8Zf/s7+Cn/hjfxSPpyMqgOi1Csq3uy4KgbxW3KlwB8I4+6BI2m3gNBNVSykRoajUzS7UQTIQQJ41oRJd18P+wr/+Z+o8TZhnbihoPsUMrha4fdsNozmPxEotCEaP8Xy+oO87baznX6BNonJu0ZKY2/Ok2SETMZSpoIlMnbHb75HnGcfjkTlW5R+SlMs4jsK+xfiV+b4ieMRzLT7e0PcIJtisVlzOF3Rdr2cGTNNI+BKE/pyAVETMoaBWVPduMp+TEhV9iISCXFGTFlTkqesZ3eVM4TTCtXlWDgzANE802A4vABgvFykfMr0ru6FjHvf4dMKcuYdFcHDXRRpDQaR5zp+BUlNKSDHidDqhHwb0Pec2Xi5iEj6/Syy+8LxP16nISV5eSox4KUASinnGPE1IXYcUGY3QWDDn6U5SUhHBPE/Meyl/t9luYDAVyRR0fQeYF2LQsHFdchoQ8PT0xNRB168QEkb0+92OgptnjOOFxlzKwaP83W7XoOKYEi7jBefjGbnIgZOy6boOVXl6Fzb/2feMDiaVbIiRxkRKhJ6eQ5DcybVRpbL3okCiJq7kU0o0VCq+8/0B+JkYyYOQk+zReQgBMSaEmNB1PYJQKEbriUYuddhsttjtr7A93CKkAZUWAoy5MqKcg6Aiu0l5uRiJZsyzIG8hOKYikGlmWqisYG6va6ATTgPFqDwwb50iYqQjGkJCzfwcUS43SkpH5Cz0hyhPzgUhUpmSVz1v6vwiQ0CvGxDy4OPXKr2ktfmYHs25GQkyGCZ6l8Jocprmxos0rooGO0Kps1IcqHA3S2qWdRrkERpcz81OE4sguX7QUXIHrtBBiJEOEQv4yGcegXnx1jgyJUQInboLrhMC4U8AuIwX8caCNnCudGrc6IwjHXmPrDkejbcb6a5zvU0HiLnTqnoX7oPJuXRDaGaACdGbRqBm1Jyx6Tq8/eJN7K9v8FM/+ZPIpeKrX/shzIWGkPtCp3dUoaOZoRrz0i6rNKZca9O1xhQR91koh/acAZujrp10On/HgkfZz1ph/9a//mdqkWfa91z8Wbk7V0QxRuSZ8B7xZBYWQEUCTFYT7q0qyJkLjU5KJLg/0BVHKRn9hpDorCo8hxfmKTcDOHtSPDKXmFJqeUwzMpsbtKyEOQpzta7QnDF8DhxvycF1mufl4pWG3KDgEYYZcl0S8HQSyPxBMPY4jsqlKNowrnFZM4seUuwwqjLPo/t+oEFziOR8OmOzYb5vnkakmHA6n5qhLx7FqcAjxoDxQsSB8B6NYghYQfmUVWcqZ/Bh4J7PqtqurpxARVFRMc8z5mlWVXIlrJ2z4PFlDKdZlQGqKqzabDbNeaBh9twjIx33aqd5liKLGpPeKwE2zt2MCqhPhOE98vGCj6CCHuaxgePxiPP5jOura6SUMI2jjKMKy+bJ/UYa41IUEUihSXiGYcBcCFWy8Miw3WykuGdcVHQXY0RKKq4KNFo0gFTqrsRCkIKsjNaiF1QoeoaqWrkOGlenXdd1GMcROVPWmDKZmpGkQ5ExjSNpCzoKsMAK/VzQqVCKcDvzrF79XS1gyobzRRGWinygIseiqtt+s8Ww3TNKrpzvfn+FfhgYEU8jkhUMPQ065TFxLZJV8oryjXKqoNwhDYnBLMIsYrwoTRTk1K8qbLukqDSwtsDciIKGq1Y6rJvNBrWSp51voX2jIV2MOyNVKWLIliq6Kg2y5n6RdjxZ4bzqRtnXQyUdcBnPQrACUojou2EFpXuExyiUCCENa61E6TgfOjyuC3yCQXnP32ugoTnxxe9WFVkG6XI6mL8nEg10TqibCMW77psnd5b5eMKhNLohEI2b54n8lhh0+X5TH2utGsF1E7hMyX0lYmbA+XTCzdUBd59+it/3wz+CX/xrv4g/++f+LH78j/w4ug35mfNk5TJ5ygM8pkJEiEYPl3czTwnoVIDqCaaJzpEXb0L74mOaomPAoWM5Bn/xz/3PK7wYQOXfbgzIXDMZLxBiIHGogJUWEiGZ+zidTw2iCyEwDyKjN88zNpuNjGBmddVMBQ/QM+FGGfJMD4L5W47jiut0OmG33yLFiMt4QWqFOgrLYZjGM2JKGDYblsWvxvDcLqEGFq1UVMwT55JLYVm7oimvdPMNqFVHgCIrIk0FR+659/0AoOByOanCrgBgJWgWbNx3vYw7+b7WgtjxyA0VSKB5zDNQaewJTZCJ55yx3QxIniM9nWUstfmgcMGYS855Rp5Z8LTZbOTlk6nQoCpBN2Q/bJQLvru/A1Ab/ZwB3SNnrpmGMajym9CJIDJFF1QUFSGRdkUFadVhNwnaNE6M2pUPvYyqNBesGIjIomTmbEIImOaMcVRltAS066iQRsH0VBh8lULjQngsYLvZ8kiS8mRVCIO2h4anc1iM9EqC8cm/fMWYcLmcWcE+DIoQuJ8x0SmtYMk/UDBeLricz+iHAUF5X3dEKJOsEI8xMu2yqg9glEioMsaImDpM84SSM/b7Hfquk0JnxHg5n9GlhN1+hxAT5lwwqZjj+voaKcYW5ZRSkIvngTPGaUK/2bb0UK0VFjvEjsV188QjSrUA40h6b/qEZDMdXeW7UuppyFV1GUNE3/fcf0XQXdchKJ9vFho8HeS0UgZIm2mauBcdi+4KDFX5YTqLNCAQf0Y55ow0WJnqCFTOhDhpgGis3OBbAObCo1SQ8aHjRee2SL8l1W1UVbSWWoFKI1+1b+dRR+UCIyAzgwc3Pn6MUek3ilvWsRvzClsQsXFjVeWcoNKtJgcDUCQeAumZM2U0yLhkpc8GoVWzjvM4T5NXNQ83UpL/IufcZMyrvhCjFxUyMPN50JBVnqZYwfNRToPPyddT9LPJ4TMAeZoQSsYXfuDz+J/8y/9jnM5n/DM/9odw93DHVUtmsoqyaGhJu1IqHVDVRwQ3tkKHbHWiACr6dJsQZDAbXXR8kwgXU0GTKtFLLbB/59/412rOXvbsOSMqzd12AxPzxkhvl95GggV6FEVQBXRe6unpEcPQYyNvkHk0MmeW9zVst3g6HckI+i83iqXgbly9spYRDY2azy8EwgRZkFhQcUiXejLJNOFyuTBfIiGZBE0a6zRYjAUsOVlQ+U+Cagedx7PgkS+ZyszzetzAOfNM7qyzbzFFdF3C+XTEph8YzSrXklKH8+XSFOg0j1SyYipX2sEMhop5YmRiEqRxnHAZWb089EzwQ2X7QUeSSuW5R7IY0PUdaSFlw1J/GkgqSS9SobEoXtGsijpCOqQ7PTIyE+F4Rkmn0wm1AhtV/40Tz/Ntd1vEEHA5X1DkRBWNMyuHEQRVeuRyvpyBWrHf72FmOJ0u6Lz4yws7rGCeWG0YY8Q8spDGIMMqR40OwNQQji51SF3CeOGxphACglGZe075dD4LXSCEFhoSQFaiAqQxc36gMkDLL886RhBigFUqmaqagSx6BoPOURshQx0Fo/Au8FutFefzGc/feEOGWqkCOTBQpBICDX1MflYZyNVQayB8P10QVUA2ThMQE0K3Qy5BNQdAtAKrSkvEhJILUjLSNnSYshfgJByPZ1js0A8DawVUzFJLRgpAChWooj0M53HE6TyiIqDrWTdRy4y+o/wxzUul3PeMhDbDRnRVoZbkpOsYAfV9rzPtHY1yPzB7KRTA6UR5JRIxTRP5rYBH9ISmlLpEpkWQX1UurvPcv3iwCJXxCJFGaTm/XXVEJ+fCghcVG60reGfBlJwn5SjEiHEaMeeMvu8AoXsue3wejV0FHWeoeKbWSgOtQjrzoqoK1ErZqIoMTY7qPE+olSjUPBO+Tim1+VaIDoJE4fn1siCJgCwwVGwJrbF46ok0DYqEaQcUAFQ6AJRryYkMqsucQ9ybYcDHH36IH//Dfxh/9T/9y/hLf+n/jP/6P/tjGLYDXr78VCjMMh1fp9uYrDx3il7ZzDyqyWFnhEp6TNOIoR+IFrUiPlZu50LkCI4uKa1WlYaYpgn2F/53/4taa0VQ0neaJuR5xjiO2G42uLo64Hw+oWQqi0kNBLb7HYqqWX3hNArueSiEF9OllDBOI8Z5xv7qisordQjgOSg/n0qDQkhhzplwjcqkXdGVwjxf6hJOpyNiCNhsBpapl8LcQSnI2nxX2MfTCZthQC5M7u/2O4zyeMm8LBLqux41Z8wTq0RzYTWeBUHgIJwhHxE5Z8SOB6lzZV7m6uqAy/mMWjJ6NbOYJh6heXh8RK0VV1dXGMcLS8QFTeeZUVzJGZfzibCiIlkTssONZcFSCKym7Tp64q9evsSw2eDqcIXj6YRcWBVpxupDU9Xr09MTJq+C1fGfGBejyvwXcyAxRmy2jPzJUDS2qGyMsT8cFGWykGmaRjLYPKGCTUJqycje2MHoKGUVdUnUnElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElElEl, 44320652, 33140643, 79246700],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ],
      borderWidth: 1,
      hoverBorderColor: '#000000',
      data: [160, 50, 100, 60]
    }
  ]
};

const pieOptions = {
  legend: {
    display: false,
    position: 'right',
    legendCallback: function(chart) {
      console.log(chart);
      var text = [];
      text.push('<ul>');
      for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
        text.push('<li>');
        text.push('<span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">' + chart.data.datasets[0].data[i] + '</span>');
        if (chart.data.labels[i]) {
          text.push(chart.data.labels[i]);
        }
        text.push('</li>');
      }
      text.push('</ul>');
      return text.join("");
    }
  },
  layout: {
    padding: 0,
  },
  responsive: true,
  maintainAspectRatio: false,
}

export default class Doughnut2 extends React.Component {
  componentDidMount() {
    console.log(this.refs.chart.chart_instance); // returns a Chart.js instance reference
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Doughnut Example</h2>
          <Doughnut ref='chart' data={data} options={pieOptions} />
        </div>
        <div id="legend">
        </div>
      </div>
    );
  }
}</code>

[Answer 2]

Chart.js provides an easy-to-use feature to show legends in any part of your page using the <code>legendCallback</code> function and <code>generateLegend()</code>.

First, you need to register the <code>legendCallback</code> in the option like this

<code>var options = {
        //...
        legendCallback: function(chart) {
            var text = [];
            text.push('<ul class="' + chart.id + '-legend">');
            for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
            text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">');
            if (chart.data.labels[i]) {
            text.push(chart.data.labels[i]);
            }
            text.push('</span></li>');
            }
            text.push('</ul>');
            return text.join("");
        }
    };
</code>

Then you generate the legend using <code>generateLegend()</code> function

<code>var myLegendContainer = document.getElementById("myChartLegend");
// generate HTML from legendCallback
myLegendContainer.innerHTML = myChart.generateLegend();
// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
}
</code>

Here is a JSFiddle: https://jsfiddle.net/k3n0463h/1/

[Answer 3]

I had the same problem, i resolved it creating a component using the legendCallback function as props, and the ref of the chart to call generateLegend()

the chart.js version i use is 2.5.0 and react-chartjs-2 version is 2.1.0

You can see how works in this fiddle: https://jsfiddle.net/YeisonDaza/m2g0k20y/2/

<code><div class="chart-container">
    <canvas id="myChart"></canvas>
    <div id="legend" class="chart-legend"></div>
</div>

.chart-container {
    position: relative;
    margin: auto;
    height: 80vh;
    width: 80vw;
}

.chart-legend {
    margin: 10px 0;
    font-size: 12px;
    text-align: center;
}

.chart-legend li {
    list-style: none;
    display: inline-block;
    text-transform: uppercase;
    margin: 0 10px;
}

.chart-legend li span {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [{
            backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                "#34495e"
            ],
            data: [12, 19, 3, 17, 28, 24, 7]
        }]
    },
    options: {
        legend: {
            display: false
        },
        legendCallback: function(chart) {
            var text = [];
            text.push('<ul>');
            for (var i = 0; i < chart.data.labels.length; i++) {
                text.push('<li>');
                text.push('<span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                if (chart.data.labels[i]) {
                    text.push(chart.data.labels[i]);
                }
                text.push('</li>');
            }
            text.push('</ul>');
            return text.join("");
        }
    }
});

document.getElementById('legend').innerHTML = myChart.generateLegend();
</code>

[Answer 4]

I tried this method, it's working for me. This solution is for ReactJS

<code>const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

   const legendOpts = {
      display: true,
      position: 'right',
      fullWidth: true,
      reverse: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    };

    <Doughnut data={data} legend={legendOpts}/>
</code>

