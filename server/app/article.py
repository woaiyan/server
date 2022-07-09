from rest_framework.viewsets import GenericViewSet
import os

from server.app.result import JSONResponse


def dirTree(path, input, sub_path):
    dir_list = os.listdir(path)
    for dir in dir_list:
        sub_dir = os.path.join(path, dir)
        if os.path.isfile(sub_dir):
            input.append({"name": os.path.splitext(dir)[0], "path": os.path.join(sub_path, dir), "isLeaf": True})
        else:
            children = []
            item = {"name": os.path.splitext(dir)[0], "children": children}
            dirTree(sub_dir, children, os.path.join(sub_path, dir))
            input.append(item)
    return input


class AritlceHandle(GenericViewSet):
    def get(self, request):
        dirs = dirTree("C:/Users/24224/OneDrive/文章", [], "")
        result = {
            'result': dirs,

        }
        return JSONResponse(result)

    def handleDetail(self, request):
        try:
            filename = request.query_params['filename']
            file = open(os.path.join("C:/Users/24224/OneDrive/文章", filename), 'r', encoding='utf-8')
            result = {
                'result': file.read(),

            }
            return JSONResponse(result)
        finally:
            file.close()



