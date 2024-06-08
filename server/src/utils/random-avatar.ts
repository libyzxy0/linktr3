export const generateAvatarUrl = (id): string => {
  const types = ["window", "github", "mosaic", "mono", "gravatar"];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const url = `https://avatar.marktion.cn/api/avatar/${id}x?t=${randomType}&s=512`;
  return url;
}