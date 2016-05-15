'use strict';
angular.module('app.core')
    .controller('imageHelperDialogCtrl', function($scope, parameters, imageService) {
        var vm = this;
        vm.item = {
            previewFile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAAE1CAYAAACSpiugAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADgVJREFUeNrs3Y1W20YagGERAiQQCoTSvZHt/V9A9zr2bJvSmhCMgWBWHxm1SmrCyPhH1jzPOT6wu24XC8PLSDOjrYeHhwoA+NsrhwAAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAEEcAQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBQBwBAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAHEEAMQRAMQRAMQRAMQRAF7mtUMAVfXzz//erj/spMcmm9aPz7/88p8b31WY39bDw4OjQMlB3E+P7QG+xEn9uBJKEEfIDeNh/eGgKuPSwm39uKgjeec7D+IIs6IYMTytNv/06TxGdSDH3gXwPBNyEMZyHNfHYN87AcQR2koOYzuQe94KII7QXGPccSQenaRRNCCOFBzGmIl66Eh89XPveIA4Ujgh+KeD9EcDMINNABj6qDH+AOwyCeVxEf2Gvtytqtup43f148K7BMSR8rztEMWPm77UIY0GT+rHbuaxEUeYwWlVhu5d5vMGsQawfg339eP3+tOcBf+vLO0AcaQwaclCznW12zook4G9/I+ZzxNHEEcKk3tK9dPQXnjaTzVn9LhrYg6II+WMGnMn4twPcNTYuMp83jvvGBBHjBrbhrzXaER/usBjBeIIGy53NDTYONYj4mkK5LO/B0zMAXFk4DpMxBnH7M6BH47cU6viCOLIwOWeJrwe+oFI93A0MQfEkcJHjV0m4twUclhMzAFxxKgxy6eCjomJOSCOFC539HNdygExMQfEkYJ1nIgzLezwmJgD4kihcm9NdV3agek4McdNoSne1sPDg6PAEEaLMeLJuRNFTMT5tdBjFcfoOOOp0/QHRJyK/VzAchf4B7esYhN+qccZjp30fn3d+nyeMx+fCj6UzcSc545b/O8H6RHHPz7cVl/uc3nffC6aGDnC5kXwKb+W/Eu9PsbH1WKvK4omRo6wwF/ScSq0OSXafFz2IvSJX9yPE3MWGcfd6pvT2fX3dpqC2VznLGlNKUaOMFcQ99NjHbux/DHgO3B0+T6cpVH5qsWxvxJKxBH+/oUcM0kP1/glFDsRZ8b3IndizrLE6deLNIMWeslSDpb9i/hVGqkcrvlLGftufDWCW6c4DXtmwwHEkWLDWH84rdZzCu+rUWOVvwh+8NIGCH04HscCSV85rcoy47iua1uNZtu0j6vYEac123Y3fYz//Nxs29v08SZF/G5VpxvTqe43Pfjj5dx1SMSRUsK4ymuM9+lxk4L4OUVmFUGMsOy3grjIqEc4Jyt8HdvpNbQ/X9UfMb8VuKUf4khhYYxfrP9acgQfP1/HiCONEOMOFu+q1cy6jeul12t6rauKZsxivfDTgzgy5Di+dKF5L9fJpegfVuvbnDv+ILisj8W4B8eivTZ1UetU/2f0iDgy1DDGqOqnKn+yV3MK8a5a4enQOV7TQbX+GbftSI76eJ2uFc32tddcEf5LP0WII0OM41EKSU4UP/ZhFPTM64kJK8dVP2d2xx8VF33e9SeNtk+qvE3h4z3xwS5G9IGlHCxa7kjhzz6HMa3PfF9/+r7HPycR7rMU8F6K0NWP36u822U1s3tBHCnSXZ+n7qdJKGcpPpvwM/w+XeftM6dL2Sj+SmMdbnscxphs88MG/uG4n6J+3tNJLbfe9hg5wvf1ckZia8/RVwt4fbdptDSKYKVHzMb8b/3xQ+u/i+fE6eVFXGeLOJ6m63y9YhYqRo6wgRawGXf88r+uvizav3kmFO3rbzetryGiFqdy96v51xI+nhKu/13nNvYGcYR1hXFhaw/TLM3Y8/TqhWsqY+R7nAJpxAbiCJ3DuDdnGJe6ID+FclR/fZdzRrI5xSqQMOdfmFBqGJs1eF3F6O7DKpaipKUQzXXLrtclI5A/+E6DOEIXXdcwxggsRmIXqx6NpeuYMZGna5BjFuuBbzWII+SMGg+rbpNeYnLLb+tcnxlBTqPIUcd/9LCPM1hBHKFfYYwodtkn9a7q0frBdDp31PHn/MR3HsQRvudoU8P4gkDuplm5QAazVSlt1NjcmHipYUyj01izuJd+ztp/iMYGAX+8NLgRyPr/Jz7NnW0bp1cnZq+COMI/ApH5vAjIqEtIWre2igB/7xpfxDlulny1iBFkCnHOpJvt9Dz7nMIznFaltFFj7sSUUZcdZtKdMX5K8d1e5c9ezJ6t8u56UVXru1EziCNs+KgxTj1OckeL6Y4YXZaFNDd4XqTc64/brj2COEITsb3MEd00NzTpNOppxmis2Yg8TqPGKc0Pi973NP37ck+XiiM8wzVHSvE283lXOdcZW2Hc+U4QYyPy8Qo3AI/4HmT80RszV7fTFnWAOFKwnBsXT6v8STJPhXGaArvySS8R9Tp68fUfZh6PK28LmM1pVQYvTZbJea/njhqPnghjjBA/rCOM34weczi1CuJI4fYyn/fsvqXp2uXBE2E8X/epyhT3nP1Xd9KpYUAcKVTOov+7zLDNusvFfdWvXXQmCzwuII4wNGl0lLPBeO6ocda/a9SnXWdyl6FU3TZeB3GEAckNwG3Gc2adTh2v804dL3w9e94eII6UKWdG9vS55RZpBDprxmtft2LLCfaWtweII97jT/mc8ZxZ1+cmPV4rmLO20mlVEEcKlXPqMCeOs0Iy6fHrtsAfxBGWHpK9OUdna5G7K0+aZASII6w2QIA4QincMBjEEcTwm/9865CAOELpLluBnFb9XcIBiCOsRrq++Fv9OI+PA7re6PQwzOCWVQxdzi//nJsgN5t632zCi86dhWpSERg5UqacX/5D/CPR7jcgjvCikeMQ706Rs/uNUSOII4XK2f0mTkMObSu1nNOqdtEBcaREHe6Y8WYorzltkp51D0vvEBBHypUTgTcDer25r8VaTRBHCpYTgZ0BnVrNimNP70MJ4ggrknv3jINNf6F14Lcz4zjxtgBxpGBphJQza3U/Xa/bZIeZzzNqBHGE6nrBcenrqHF/waNpEEcYsHHm8w5SZIY8apzUo2nLOEAcKV3aJi13dubJBo4a9zqMGq+8I0AcoZF7J43dOjYbMzknXSc9znz6vVmqII7QHj3edBg9HuVu3t0DEcbcU8FutQXiCC+Kw0nf1z7WX99Rlb/o/67+A2HsLQDiCLNGj5MOPx/v+7q8o/664hpjl9O/H70DQBzhKRdV/k1+43Tlad9GkOma6HGHf2TsWiOII3xv9HjfcRS106dA1l9HRPGowz/S9fWCODoEFBrIuPY27vizcrbOWayx/rJ+nFX5SzYao/r1Tn3XQRwhR4ymut62KWax/rjqjQJSlM+qvJsYt104nQriCF1GjzGa+qPKv/7Y2E2jyMNlT9aJ5SRptHg0x89rXGe04B/m8NohoPBA3tfxOa8/Pe0Yn3hubNcW281dpRAtbEu21kzUea9zxhZxI99hEEeYN5B3cwayHckYRcYSkXjcdA1lGoHGiPRNerxkRBqnioURxBHWGshGE7aIXcQxrvXdtx5t263HzgtGiN8aGzHCy7nmCK1A1h/Oq+6TdGZpbh8Vo8rjFN324zj9b/sLDOOVMII4wjIDuUn3O4wJRbFc48J3EMQRlhXIaf2IWaxddtJZl8eY2zMVFss1R3g6kldpkk3c33G3h6PFS0s1QBxhHYGMiTS/15GMiTax1nC7B1/WOIXx3ncIxBHWGcnHZRpp/eHhmiIpiiCO0MtIPu7Jmm6EHIv03yz5/zJC+Kl+XNsfFcQR+h7JWMN4kxbvN+sb47rkIia53VZf1khO0uxZQBxhoyIZo7m/7vCRbmsVjzjtutf6OXv1RARDBPBzPGwSDuIIQ4zlXfX3JgKXjghsJuscAUAcAUAcAUAcAUAc2TQ7DkFZ0rpQEEf4jjdpyQPleOsQII6ULHcXl+M6kNsOVxGjxthyb3/B7x9Yqq2HhwdHgUX+IozTZ6cdfhFeV192g/FGHJ7YMWivyr+jySTdKgzEkUEG8n21/D1HGZ4PtsujL5xWZRncY5CuboURcWTQ0v6gE0eCDv50CBBHSjCqTK4gz4V7VCKOlDJ6jDCeCyTPGNfvFafhEUeKCuSdQPJMGEcOA31ktipLl9YznlT5U/oZtvhj6dKIEXGE6q/F4IfVlxsBU+hoMYXRNUbEEb6JZGwdF+sgY4H4VmWv1SGPED+nx231ZZG/U+yIIwBsIhNyAEAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAUAcAQBxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBABxBADEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQDEEQAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwAQRwBAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAFAHAEAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAcQQAxBEAxBEAxBEAxBEAxBEAxBEAxBEAxBEA+uD/AgwAL4BKyGApPggAAAAASUVORK5CYII=',
            uploadedFile: null,
            croppedFile: null
        };

        vm.playerVars = {
            rel: 0,
            showinfo: 0,
            modestbranding: 0,
        };

        vm.option = {
            quality: parameters.quality,
            targetWidth: parameters.width,
            targetHeight: parameters.height,
            saveToPhotoAlbum: false,
            destinationType: 0
        };
        vm.ratio = parameters.width / parameters.height;
        vm.hasInstruction = parameters.hasInstruction;
        vm.instructionVideoID = parameters.instructionVideoID;

        vm.openCamera = openCamera;
        vm.openGallery = openGallery;
        vm.confirm = confirm;
        vm.close = close;

        function openCamera() {
            vm.option.sourceType = 1;
            imageService.getPicture(vm.option).then(function(imageUri) {
                vm.item.uploadedFile = 'data:image/jpeg;base64,' + imageUri;
            });
        }

        function openGallery() {
            vm.option.sourceType = 0;
            imageService.getPicture(vm.option).then(function(imageUri) {
                vm.item.uploadedFile = 'data:image/jpeg;base64,' + imageUri;
            });
        }

        function confirm() {
            $scope.closeModal(vm.item.croppedFile);
        }

        function close() {
            $scope.closeModal(null);
        }
    });
